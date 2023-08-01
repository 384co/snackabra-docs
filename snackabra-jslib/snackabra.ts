/*
   Copyright (C) 2020-2023 Magnusson Institute, All Rights Reserved

   "Snackabra" is a registered trademark

   Snackabra SDK - Server
   See https://snackabra.io for more information.

   This program is free software: you can redistribute it and/or
   modify it under the terms of the GNU Affero General Public License
   as published by the Free Software Foundation, either version 3 of
   the License, or (at your option) any later version.

   This program is distributed in the hope that it will be useful, but
   WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
   Affero General Public License for more details.

   You should have received a copy of the GNU Affero General Public
   License along with this program.  If not, see www.gnu.org/licenses/

*/

// update package.json too; we flag 'pre' if it's a pre-release of 
// a version, e.g. if it's not published to npm etc yet
const version = '1.1.25 (pre) build 01'

/******************************************************************************************************/
//#region Interfaces - Types


export interface SBServer {
  /**
   * The channel server is the server that handles channel creation,
   * channel deletion, and channel access. It is also the server that
   * handles channel messages.
   */
  channel_server: string,
  /**
   * The channel websocket is the websocket that handles channel
   * messages. It is the same as the channel server, but with a
   * different protocol.
   */
  channel_ws: string,
  /**
   * The storage server is the server that all "shard" (blob) storage
   */
  storage_server: string,
  /**
   * "shard" server is a more modern version of the storage server,
   * generally acting as a caching and/or mirroring layer. It proxies
   * any new storage to one or more storage servers, and handles
   * it's own caching behavior. Generally, this will be the fastest
   * interface, in particular for reading.
   */
  shard_server?: string
}

/**
 * SBChannelHandle
 *
 * Complete descriptor of a channel. 'key' is stringified 'jwk' key.
 * The key is always private. If it matches the channelId, then it's
 * an 'owner' key.
 */
export interface SBChannelHandle {
  channelId: SBChannelId,
  key: JsonWebKey,
}

interface WSProtocolOptions {
  version?: number,
  url: string, // not the user (client) url, but where the socket is
  websocket?: WebSocket, // will have a value if we've connected
  onOpen?: null | CallableFunction,
  ready: boolean,
  // onMessage?: null | CallableFunction,
  onClose?: null | CallableFunction,
  onError?: null | CallableFunction,
  timeout?: number,
  closed: boolean,
  init?: { name: string },
  // identity?: Identity,
  // keys?: ChannelKeys,
  // motd?: string,
  // locked?: boolean,
}

// for future use / tighter typing
// type StorableDataType = string | number | bigint | boolean | symbol | object

// TODO: there are many uses of 'Dictionary<any>' that should be tightened up
interface Dictionary<T> {
  [index: string]: T;
}

// These are 384 bit identifiers encoded as 48x ~b64 characters
// (see SB384.hash for details)
export type SB384Hash = string
export type SBChannelId = SB384Hash
export type SBUserId = SB384Hash

interface ChannelData {
  roomId?: SBChannelId
  channelId?: SBChannelId;
  ownerKey: string;
  encryptionKey: string;
  signKey: string;
  motherChannel?: SBChannelId;
  SERVER_SECRET?: string; // used internally for storage budget authentication
  size?: number; // used internally
}

interface ImageMetaData {
  imageId?: string,
  previewId?: string,
  imageKey?: string,
  previewKey?: string,
  // nonce and salt not needed, but if it's there, we do extra checks
  previewNonce?: string,
  previewSalt?: string
}

/**
   for example the incoming message will look like this (after decryption)

   @example
  ```ts
    {
      "encrypted":false,
      "contents":"Hello from test04d!",
      "sign":"u7zAM-1fNLZjmuayOkwWvXTBGqMEimOuzp1DJGX4ECg",
      "image":"",
      "imageMetaData":{},
      "sender_pubKey":
          {
            "crv":"P-384","ext":true,"key_ops":[],"kty":"EC",
            "x":"edqHd4aUn7dGsuDMQxtvzuw-Q2N7l77HBW81KvWj9qtzU7ab-sFHUBqogg2PKihj",
            "y":"Oqp27bXL4RUcAHpWUEFHZdyEuhTo8_8oyTsAKJDk1g_NQOA0FR5Sy_8ViTTWS9wT"
          },
      "sender_username":"TestBot",
      "image_sign":"3O0AYKthtWWYUX3AWDmdU4kTR49UyNyaA937CfKtcQw",
      "imageMetadata_sign":"4LmewpsH6TcRhHYQLivd4Ce87SI1AJIaezhJB5sdD7M"
    }
    ```

  */
export interface ChannelMessage {
  type?: ChannelMessageTypes,
  keys?: ChannelKeyStrings,
  _id?: string,
  id?: string,
  timestamp?: number,
  timestampPrefix?: string, // '0'/'1' - 42 of them
  channelID?: SBChannelId, // base64 - 64 chars (512 bits)
  control?: boolean,
  encrypted?: boolean,
  encrypted_contents?: EncryptedContents,
  contents?: string, // if present means unencrypted
  text?: string, // backwards compat, same as contents, TODO: should be removed
  sign?: string,
  image?: string,
  image_sign?: string,
  imageMetaData?: ImageMetaData,
  imageMetadata_sign?: string,
  motd?: string,
  ready?: boolean,
  roomLocked?: boolean,
  sender_pubKey?: JsonWebKey,
  sender_username?: string,
  system?: boolean,
  user?: { name: string, _id?: JsonWebKey },
  verificationToken?: string,
  replyTo?: JsonWebKey, // used for old design for whispers.  todo: clean up
  // whisper: if present, it's the unwrapped 1:1 contents
  whisper?: string,
  whispered?: boolean,
  // 'new': intended recipient; means contents are further encrypted
  //        using key derived from 'sender_pubKey' and our own (private) key;
  //        jslib will only decode if it's intended for us (that's the only
  //        way we can decrypt it anyway)
  sendTo?: SBUserId, // public (hash) of recipient
}

// interface ChannelAckMessage {
//   type: 'ack',
//   _id: string,
// }

/**
 * ChannelKeys
 * 
 * All keys relevant for a given channel, in decoded (CryptoKey) form.
 * They are sent over channels as a message (see ChannelKeysMessage);
 * in export/import code they may be in the intermediary form of
 * strings (see ChannelKeyStrings).
 * 
 *
 * @example
 *
 * { "ready": true,
 *    "keys": {
 *            "ownerKey": "{\"crv\":\"P-384\",\"ext\":true,\"key_ops\":[],\"kty\":\"EC\",
 *                        \"x\":\"9s17B4i0Cuf_w9XN_uAq2DFePOr6S3sMFMA95KjLN8akBUWEhPAcuMEMwNUlrrkN\",
 *                        \"y\":\"6dAtcyMbtsO5ufKvlhxRsvjTmkABGlTYG1BrEjTpwrAgtmn6k25GR7akklz9klBr\"}",
 *            "guestKey": "{\"crv\":\"P-384\",\"ext\":true,\"key_ops\":[],\"kty\":\"EC\",
 *                         \"x\":\"Lx0eJcbNuyEfHDobWaZqgy9UO7ppxVIsEpEtvbzkAlIjySh9lY2AvgnACREO6QXD\",
 *                         \"y\":\"zEHPgpsl4jge_Q-K6ekuzi2bQOybnaPT1MozCFQJnXEePBX8emkHriOiwl6P8BAS\"}",
 *            "encryptionKey": "{\"alg\":\"A256GCM\",\"ext\":true,
 *                             \"k\":\"F0sQTTLXDhuvvmgGQLzMoeHPD-SJlFyhfOD-cqejEOU\",
 *                             \"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}",
 *            "signKey": "{\"crv\":\"P-384\",
 *                        \"d\":\"KCJHDZ34XgVFsS9-sU09HFzXZhnGCvnDgJ5a8GTSfjuJQaq-1N2acvchPRhknk8B\",
 *                        \"ext\":true,\"key_ops\":[\"deriveKey\"],\"kty\":\"EC\",
 *                        \"x\":\"rdsyBle0DD1hvp2OE2mINyyI87Cyg7FS3tCQUIeVkfPiNOACtFxi6iP8oeYt-Dge\",
 *                        \"y\":\"qW9VP72uf9rgUU117G7AfTkCMncJbT5scIaIRwBXfqET6FYcq20fwSP7R911J2_t\"}"
 *             },
 * "motd": "",
 * "roomLocked": false}
 */
export interface ChannelKeys {
  // these come from the channel server;
  ownerKey: CryptoKey,
  ownerPubKeyX: string, // the 'x' part of ownerKey, used as channelID / name
  guestKey?: CryptoKey,
  encryptionKey: CryptoKey,
  signKey: CryptoKey,
  lockedKey?: JsonWebKey,
  // derived from the above and used for signing messages we send:
  // channelSignKey: CryptoKey, // moved to ChannelApi
  publicSignKey: CryptoKey,
  // our identity in case we want easy access to that:
  // update: not generic enough, servers don't have this
  privateKey?: CryptoKey
}

// // Roughly what it looks like on the wire from a client:
// {
//   "roomId": "DL5hgKneBl_...tMLCv4fEyWnxE01O",
//   "ownerKey": "{\"crv\":\"P-384\",\"ext\":true,\"key_ops\":[],\"kty\":\"EC\",\"x\":\"A0rUue9TlSgK...Nx54d3\",\"y\":\"uGfIqc....fP1tF66jL\"}",
//   "encryptionKey": "{\"alg\":\"A256GCM\",\"ext\":true,\"k\":\"62mgVb...Shmc\",\"key_ops\":[\"encrypt\",\"decrypt\"],\"kty\":\"oct\"}",
//   "signKey": "{\"crv\":\"P-384\",\"d\":\"Vw2HwY...oYl6qJ\",\"ext\":true,\"key_ops\":[\"deriveKey\"],\"kty\":\"EC\",\"x\":\"6lz3m...v9J2IjCj8\",\"y\":\"M6Ta8...ncnH1G\"}",
//   "SERVER_SECRET": "..."
// }

interface ChannelKeyStrings {
  encryptionKey: string,
  guestKey?: string,
  ownerKey: string,
  signKey: string,
  lockedKey?: string,
  error?: string,
}

interface ChannelKeysMessage {
  type: 'channelKeys',
  ready: boolean,
  keys: ChannelKeyStrings,
  motd: string,
  roomLocked: boolean,
}

export interface ChannelAdminData {
  room_id?: SBChannelId,
  join_requests: Array<JsonWebKey>,
  capacity: number,
}

/** Encryptedcontents

    SB standard wrapping encrypted messages.

    Encryption is done with AES-GCM, 16 bytes of salt, The
    ``contents`` are url-safe base64, same thing with the nonce (iv),
    depending on if it's internal or over wire.
 */
export interface EncryptedContents {
  content: string | ArrayBuffer,
  iv: string | Uint8Array
  // salt: string | Uint8Array,
}

/**
 * Same as EncryptedContents interface, but binary view enforced
 */
export interface EncryptedContentsBin {
  content: ArrayBuffer,
  iv: Uint8Array,
}

// set by creation of Snackabra object
var DBG = false; // this should not be checked in as 'true'
var DBG2 = false; // internal detailed debugging

/**
 * This is the standard (most common) channel message. It matches
 * directly to a 'chat' message. But the contents can be anything.
 */
interface ChannelEncryptedMessage {
  type?: 'encrypted',

  // base64 - 64 chars (512 bits), e.g:
  // 'wDUMRbcfFhdmByuwMhFyR46MRlcZh-6gKRUhSPkWEQLSRUPE8_jqixV3VQevTDBy'
  channelID?: SBChannelId,

  // fourty-two (42) 0s and 1s as string, e.g.:
  // '011000001110001011010110101010000100000110'
  timestampPrefix?: string,

  _id: string, // backwards compatibility (channelID + timestampPrefix)

  encrypted_contents?: EncryptedContentsBin, // enforcing binary view internally

  contents?: string,

}

export type ChannelMessageTypes = 'ack' | 'keys' | 'invalid' | 'ready' | 'encrypted'

/**
 * SBMessageContents
 * 
 * SBMessage contents are either a string, or SBMessageContents;
 * the general case is the latter, which can have a message text,
 * and an image. The image should be in a format such that the
 * thumbnail is embedded ('image'), and the full image is referenced
 * by 'imageId' (full image or document), and optionally 'previewId',
 * which is a smaller version of the image (or whatever is in 'image'),
 * with the presumption that apps can chose an intermediate view
 * of whatever is in 'image'. 
 */
interface SBMessageContents {
  contents: string,
  image: string,
  imageMetaData?: ImageMetaData,
  image_sign?: string,
  imageMetadata_sign?: string,
  sender_pubKey?: JsonWebKey,
  sender_username?: string,
  encrypted: boolean,
  isVerfied: boolean,
  sign: string,
}

// these map to conventions and are different namespaces
// currently: 'full', 'preview', and 'block'. there's an (old)
// bug in current servers that they don't like reads unless
// it's of type 'p', but we'll fix that soon ...

export type SBObjectType = 'f' | 'p' | 'b' | 't'

// TODO: we haven't modularized jslib yet, when we do this
//       will be superfluous
export namespace Interfaces {

  // this exists as both interface and class, but the class
  // is mostly used internally, and the interface is what
  // you'll use to communicate with the API
  export interface SBObjectHandle {
    [SB_OBJECT_HANDLE_SYMBOL]?: boolean,
    version?: '1',
    type: SBObjectType,
    // for long-term storage you only need these:
    id: string, key: string,
    id32?: Base62Encoded, key32?: Base62Encoded, // optional: array32 format of key
    // and currently you also need to keep track of this,
    // but you can start sharing / communicating the
    // object before it's resolved: among other things it
    // serves as a 'write-through' verification
    verification: Promise<string> | string,
    // you'll need these in case you want to track an object
    // across future (storage) servers, but as long as you
    // are within the same SB servers you can request them.
    iv?: Uint8Array | string,
    salt?: Uint8Array | string,
    // the following are optional and not tracked by
    // shard servers etc, but facilitates app usage
    fileName?: string, // by convention will be "PAYLOAD" if it's a set of objects
    dateAndTime?: string, // optional: time of shard creation
    shardServer?: string, // optionally direct a shard to a specific server (especially for reads)
    fileType?: string, // optional: file type (mime)
    lastModified?: number, // optional: last modified time (of underlying file, if any)
    actualSize?: number, // optional: actual size of underlying file, if any
    savedSize?: number, // optional: size of shard (may be different from actualSize)
  }
}

export interface SBObjectMetadata {
  [SB_OBJECT_HANDLE_SYMBOL]: boolean;
  version: '1';
  type: SBObjectType;
  id: string;
  key: string;
  paddedBuffer: ArrayBuffer;
  iv: Uint8Array;
  salt: Uint8Array;
}

//#endregion - Interfaces - Types

/******************************************************************************************************/
//#region - MessageBus class

/**
 * SB simple events (mesage bus) class
 */
export class MessageBus {
  bus: Dictionary<any> = {}

  /**
   * Safely returns handler for any event
   */
  #select(event: string) {
    return this.bus[event] || (this.bus[event] = []);
  }

  /**
   * Subscribe. 'event' is a string, special case '*' means everything
   *  (in which case the handler is also given the message)
   */
  subscribe(event: string, handler: CallableFunction) {
    this.#select(event).push(handler);
  }

  /**
   * Unsubscribe
   */
  unsubscribe(event: string, handler: CallableFunction) {
    let i = -1;
    if (this.bus[event]) {
      if ((i = this.bus[event].findLastIndex((e: unknown) => e == handler)) != -1) {
        this.bus[event].splice(i, 1);
      } else {
        console.info(`fyi: asked to remove a handler but it's not there`);
      }
    } else {
      console.info(`fyi: asked to remove a handler but the event is not there`);
    }
  }

  /**
   * Publish
   */
  publish(event: string, ...args: unknown[]) {
    for (const handler of this.#select('*')) {
      handler(event, ...args);
    }
    for (const handler of this.#select(event)) {
      handler(...args);
    }
  }
}

//#endregion

/******************************************************************************************************/
//#region - SB internal utility functions

/**
 * SBFetch()
 *
 * A "safe" fetch() that over time integrates with SB mesh.
 *
 * See also :ref:`design note 5 <DN005>` for issues of connectivity.
 *
 * TODO: this will be integrated with SB (Snackabra) object and exposed
 *       to platform API for possible app use.
 *
 * @param input - the URL to fetch
 * @param init - the options for the request
 */
function SBFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  // console.log("SBFetch()"); console.log(input); console.log(init);
  // if (navigator.onLine === false) console.info("Note: you are offline, according to the browser") /* return Promise.reject(new Error("you are offline")) */
  if (init) return fetch(input, init)
  else return fetch(input, { method: 'GET' /*, credentials: 'include' */ })
}

/** @private */
function WrapError(e: any) {
  if (e instanceof Error) return e;
  else return new Error(String(e));
}

/** @private */
function _sb_exception(loc: string, msg: string) {
  const m = '<< SB lib error (' + loc + ': ' + msg + ') >>';
  // for now disabling this to keep node testing less noisy
  // console.error(m);
  throw new Error(m);
}

// internal - general handling of paramaters that might be promises
// (basically the "anti" of resolve, if it's *not* a promise then
// it becomes one
/** @private */

// function _sb_resolve(val: any) {
//   if (val.then) {
//     // it's already a promise
//     // console.log('it is a promise')
//     return val;
//   } else {
//     // console.log('it was not a promise')
//     return new Promise((resolve) => resolve(val));
//   }
// }

// internal - handle assertions
/** @private */
function _sb_assert(val: unknown, msg: string) {
  if (!(val)) {
    const m = `<< SB assertion error: ${msg} >>`;
    // debugger;
    throw new Error(m);
  }
}

// used to create NEW channel
/** @private */
async function newChannelData(keys?: JsonWebKey): Promise<{ channelData: ChannelData, exportable_privateKey: Dictionary<any> }> {
  const owner384 = new SB384(keys)
  await owner384.ready
  // const ownerKeyPair = await owner384.ready.then((x) => x.keyPair!)
  // const exportable_privateKey: Dictionary<any> = await crypto.subtle.exportKey('jwk', ownerKeyPair.privateKey);
  // const exportable_pubKey: Dictionary<any> = await crypto.subtle.exportKey('jwk', ownerKeyPair.publicKey);
  const exportable_pubKey = owner384.exportable_pubKey
  const exportable_privateKey = owner384.exportable_privateKey
  const channelId = owner384.hash
  const encryptionKey: CryptoKey = await crypto.subtle.generateKey({
    name: 'AES-GCM',
    length: 256
  }, true, ['encrypt', 'decrypt']);
  const exportable_encryptionKey: Dictionary<any> = await crypto.subtle.exportKey('jwk', encryptionKey);
  const signKeyPair: CryptoKeyPair = await crypto.subtle.generateKey({
    name: 'ECDH', namedCurve: 'P-384'
  }, true, ['deriveKey']);
  const exportable_signKey: Dictionary<any> = await crypto.subtle.exportKey('jwk', signKeyPair.privateKey);
  const channelData: ChannelData = {
    roomId: channelId,
    ownerKey: JSON.stringify(exportable_pubKey),
    encryptionKey: JSON.stringify(exportable_encryptionKey),
    signKey: JSON.stringify(exportable_signKey),
  };
  return { channelData: channelData, exportable_privateKey: exportable_privateKey }
}

//#endregion - SB internal utility functions

/******************************************************************************************************/
//#region - SBCryptoUtils - crypto and translation stuff used by SBCrypto etc

/**
 * Force EncryptedContents object to binary (interface
 * supports either string or arrays). String contents
 * implies base64 encoding.
 */
export function encryptedContentsMakeBinary(o: EncryptedContents): EncryptedContentsBin {
  try {
    let t: ArrayBuffer
    let iv: Uint8Array
    if (DBG2) {
      console.log("=+=+=+=+ processing content")
      console.log(o.content.constructor.name)
    }
    if (typeof o.content === 'string') {
      try {
        t = base64ToArrayBuffer(decodeURIComponent(o.content))
      } catch (e) {
        throw new Error("EncryptedContents is string format but not base64 (?)")
      }
    } else {
      // console.log(structuredClone(o))
      const ocn = o.content.constructor.name
      _sb_assert((ocn === 'ArrayBuffer') || (ocn === 'Uint8Array'), 'undetermined content type in EncryptedContents object')
      t = o.content
    }
    if (DBG2) console.log("=+=+=+=+ processing nonce")
    if (typeof o.iv === 'string') {
      if (DBG2) { console.log("got iv as string:"); console.log(structuredClone(o.iv)); }
      iv = base64ToArrayBuffer(decodeURIComponent(o.iv))
      if (DBG2) { console.log("this was turned into array:"); console.log(structuredClone(iv)) }
    } else if ((o.iv.constructor.name === 'Uint8Array') || (o.iv.constructor.name === 'ArrayBuffer')) {
      if (DBG2) { console.log("it's an array already") }
      iv = new Uint8Array(o.iv)
    } else {
      if (DBG2) console.log("probably a dictionary");
      try {
        iv = new Uint8Array(Object.values(o.iv))
      } catch (e: any) {
        if (DBG) { console.error("ERROR: cannot figure out format of iv (nonce), here's the input object:"); console.error(o.iv); }
        _sb_assert(false, "undetermined iv (nonce) type, see console")
      }
    }
    if (DBG2) { console.log("decided on nonce as:"); console.log(iv!) }
    _sb_assert(iv!.length == 12, `unwrap(): nonce should be 12 bytes but is not (${iv!.length})`)
    return { content: t, iv: iv! }
  } catch (e: any) {
    console.error('encryptedContentsMakeBinary() failed:')
    console.error(e)
    console.trace()
    console.log(e.stack)
    throw e
  }
}

/**
 * Fills buffer with random data
 */
export function getRandomValues(buffer: Uint8Array) {
  if (buffer.byteLength < (4096)) {
    return crypto.getRandomValues(buffer)
  } else {
    // larger blocks should really only be used for testing
    _sb_assert(!(buffer.byteLength % 1024), 'getRandomValues(): large requested blocks must be multiple of 1024 in size')
    // console.log(`will set ${buffer.byteLength} random bytes`)
    // const t0 = Date.now()
    let i = 0
    try {
      for (i = 0; i < buffer.byteLength; i += 1024) {
        let t = new Uint8Array(1024)
        // this doesn't actually have enough entropy, we should just hash here anyweay
        crypto.getRandomValues(t)
        // console.log(`offset is ${i}`)
        buffer.set(t, i)
      }
    } catch (e: any) {
      console.log(`got an error on index i=${i}`)
      console.log(e)
      console.trace()
    }
    // console.log(`created ${buffer.byteLength} random byte buffer in ${Date.now() - t0} millisends`)
    return buffer
  }
}

// for later use - message ID formats
const messageIdRegex = /([A-Za-z0-9+/_\-=]{64})([01]{42})/

// Strict b64 check:
// const b64_regex = new RegExp('^(?:[A-Za-z0-9+/_\-]{4})*(?:[A-Za-z0-9+/_\-]{2}==|[A-Za-z0-9+/_\-]{3}=)?$')
// But we will go (very) lenient:
const b64_regex = /^([A-Za-z0-9+/_\-=]*)$/
// stricter - only accepts URI friendly:
// const url_regex = /^([A-Za-z0-9_\-=]*)$/

/**
 * Returns 'true' if (and only if) string is well-formed base64.
 * Works same on browsers and nodejs.
 */
function _assertBase64(base64: string) {
  // return (b64_regex.exec(base64)?.[0] === base64);
  const z = b64_regex.exec(base64)
  if (z) return (z[0] === base64); else return false;
}

// refactor helper - replace encodeURIComponent everywhere
/** @private */
function ensureSafe(base64: string): string {
  const z = b64_regex.exec(base64)
  _sb_assert((z) && (z[0] === base64), 'ensureSafe() tripped: something is not URI safe')
  return base64
}

/*
  we use URI/URL 'safe' characters in our b64 encoding to avoid having
  to perform URI encoding, which also avoids issues with composed URI
  strings (such as when copy-pasting). however, that means we break
  code that tries to use 'regular' atob(), because it's not as forgiving.
  this is also referred to as RFC4648 (section 5). note also that when
  we generate GUID from public keys, we iterate hashing until '-' and '_'
  are not present in the hash, which does reduce entropy by about three
  (3) bits (out of 384).
*/

// For possible future use:
// RFC 3986 (updates 1738 and obsoletes 1808, 2396, and 2732)
// type ALPHA = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
// type alpha = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
// type digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
// type genDelims = ':' | '/' | '?' | '#' | '[' | ']' | '@'
// type subDelims = '!' | '$' | '&' | "'" | '(' | ')' | '*' | '+' | ',' | ';' | '='
// type unReserved = ALPHA | alpha | digit | '-' | '.' | '_' | '~'

/**
 * based on https://github.com/qwtel/base64-encoding/blob/master/base64-js.ts
 */
const b64lookup: string[] = []
const urlLookup: string[] = []
const revLookup: number[] = []
const CODE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const CODE_B64 = CODE + '+/'
const CODE_URL = CODE + '-_'
const PAD = '='
const MAX_CHUNK_LENGTH = 16383 // must be multiple of 3
for (let i = 0, len = CODE_B64.length; i < len; ++i) {
  b64lookup[i] = CODE_B64[i]
  urlLookup[i] = CODE_URL[i]
  revLookup[CODE_B64.charCodeAt(i)] = i
}
revLookup['-'.charCodeAt(0)] = 62 // minus
revLookup['_'.charCodeAt(0)] = 63 // underscore

function getLens(b64: string) {
  const len = b64.length
  let validLen = b64.indexOf(PAD)
  if (validLen === -1) validLen = len
  const placeHoldersLen = validLen === len ? 0 : 4 - (validLen % 4)
  return [validLen, placeHoldersLen]
}

/** @private */
function _byteLength(validLen: number, placeHoldersLen: number) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen;
}

/**
 * Standardized 'atob()' function, e.g. takes the a Base64 encoded
 * input and decodes it. Note: always returns Uint8Array.
 * Accepts both regular Base64 and the URL-friendly variant,
 * where `+` => `-`, `/` => `_`, and the padding character is omitted.
 *
 * @param str - string in either regular or URL-friendly representation.
 * @return - returns decoded binary result
 */
export function base64ToArrayBuffer(str: string): Uint8Array {
  if (!_assertBase64(str)) throw new Error(`invalid character in string '${str}'`)
  let tmp: number
  switch (str.length % 4) {
    case 2: str += '=='; break;
    case 3: str += '='; break;
  }
  const [validLen, placeHoldersLen] = getLens(str);
  const arr = new Uint8Array(_byteLength(validLen, placeHoldersLen));
  let curByte = 0;
  const len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  let i: number;
  for (i = 0; i < len; i += 4) {
    const r0: number = revLookup[str.charCodeAt(i)];
    const r1: number = revLookup[str.charCodeAt(i + 1)];
    const r2: number = revLookup[str.charCodeAt(i + 2)];
    const r3: number = revLookup[str.charCodeAt(i + 3)];
    tmp = (r0 << 18) | (r1 << 12) | (r2 << 6) | (r3);
    arr[curByte++] = (tmp >> 16) & 0xff;
    arr[curByte++] = (tmp >> 8) & 0xff;
    arr[curByte++] = (tmp) & 0xff;
  }
  if (placeHoldersLen === 2) {
    const r0 = revLookup[str.charCodeAt(i)];
    const r1 = revLookup[str.charCodeAt(i + 1)];
    tmp = (r0 << 2) | (r1 >> 4);
    arr[curByte++] = tmp & 0xff;
  }
  if (placeHoldersLen === 1) {
    const r0 = revLookup[str.charCodeAt(i)];
    const r1 = revLookup[str.charCodeAt(i + 1)];
    const r2 = revLookup[str.charCodeAt(i + 2)];
    tmp = (r0 << 10) | (r1 << 4) | (r2 >> 2);
    arr[curByte++] = (tmp >> 8) & 0xff;
    arr[curByte++] = tmp & 0xff;
  }
  return arr;
}

function tripletToBase64(lookup: string[], num: number) {
  return (
    lookup[num >> 18 & 0x3f] +
    lookup[num >> 12 & 0x3f] +
    lookup[num >> 6 & 0x3f] +
    lookup[num & 0x3f]
  );
}

function encodeChunk(lookup: string[], view: DataView, start: number, end: number) {
  let tmp: number;
  const output = new Array((end - start) / 3);
  for (let i = start, j = 0; i < end; i += 3, j++) {
    tmp =
      ((view.getUint8(i) << 16) & 0xff0000) +
      ((view.getUint8(i + 1) << 8) & 0x00ff00) +
      (view.getUint8(i + 2) & 0x0000ff);
    output[j] = tripletToBase64(lookup, tmp);
  }
  return output.join('');
}

const bs2dv = (bs: BufferSource) => bs instanceof ArrayBuffer
  ? new DataView(bs)
  : new DataView(bs.buffer, bs.byteOffset, bs.byteLength)

/**
 * Compare buffers
 */
export function compareBuffers(a: Uint8Array | ArrayBuffer | null, b: Uint8Array | ArrayBuffer | null): boolean {
  if (typeof a != typeof b) return false
  if ((a == null) || (b == null)) return false
  const av = bs2dv(a)
  const bv = bs2dv(b)
  if (av.byteLength !== bv.byteLength) return false
  for (let i = 0; i < av.byteLength; i++)  if (av.getUint8(i) !== bv.getUint8(i)) return false
  return true
}

/**
 * Standardized 'btoa()'-like function, e.g., takes a binary string
 * ('b') and returns a Base64 encoded version ('a' used to be short
 * for 'ascii').
 *
 * @param buffer - binary string
 * @param variant - 'b64' or 'url'
 * @return - returns Base64 encoded string
 */
function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array | null, variant: 'b64' | 'url' = 'url'): string {
  if (buffer == null) {
    _sb_exception('L509', 'arrayBufferToBase64() -> null paramater')
    return ''
  } else {
    // const view = bs2dv(bufferSource)
    // const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    // console.log(buffer)
    // const view = new DataView(buffer)
    const view = bs2dv(buffer)
    const len = view.byteLength
    const extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
    const len2 = len - extraBytes
    const parts = new Array(
      Math.floor(len2 / MAX_CHUNK_LENGTH) + Math.sign(extraBytes)
    )
    const lookup = variant == 'url' ? urlLookup : b64lookup // defaults to url-safe except when overriden
    const pad = ''
    let j = 0
    for (let i = 0; i < len2; i += MAX_CHUNK_LENGTH) {
      parts[j++] = encodeChunk(
        lookup,
        view,
        i,
        (i + MAX_CHUNK_LENGTH) > len2 ? len2 : (i + MAX_CHUNK_LENGTH),
      )
    }
    if (extraBytes === 1) {
      const tmp = view.getUint8(len - 1);
      parts[j] = (
        lookup[tmp >> 2] +
        lookup[(tmp << 4) & 0x3f] +
        pad + pad
      )
    } else if (extraBytes === 2) {
      const tmp = (view.getUint8(len - 2) << 8) + view.getUint8(len - 1)
      parts[j] = (
        lookup[tmp >> 10] +
        lookup[(tmp >> 4) & 0x3f] +
        lookup[(tmp << 2) & 0x3f] +
        pad
      );
    }
    return parts.join('')
  }
}

// Define the base62 dictionary
// We want the same sorting order as ASCII, so we go with 0-9A-Za-z
const base62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const base62Regex = /^(a32\.)?[0-9A-Za-z]{43}$/;
// branded string type

/**
   A 'branded' string type for base62 encoded strings.
   This is used to ensure that the string is a valid base62
   encoded string.
   
   "ArrayBuffer32" is a 256-bit array buffer. We use this
    as the ASCII representation of binary objects that are
    designed to be multiples of 256 bits. This has a number
    of advantages, and leverages the facts that 43 characters
    of base62 is slightly more than 256 bits (99.99% efficient).

    Note that this approach was not practical prior to es2020,
    when BigInt was added to JavaScript. BigInt allows us to
    work natively with 256-bit integers.

    The 'a32.' prefix is used to distinguish these from
    other base64 or other encodings. This is not strictly
    necessary, but it makes it easier to distinguish.
    Note that '.' is not a valid base62 nor base64 character.
    'a32.' refers to 'ArrayBuffer32' (256 bits), which we use
    as a basic type to represent 256-bit integers in 43
    characters of base62 [0-9A-Za-z]
 */
type Base62Encoded = string & { _brand?: 'Base62Encoded' };

/**
 * base62ToArrayBuffer32 converts a base62 encoded string to an ArrayBuffer32.
 * 
 * @param s base62 encoded string
 * @returns ArrayBuffer32
 */
export function base62ToArrayBuffer32(s: string): ArrayBuffer {
  if (!base62Regex.test(s)) throw new Error(`base62ToArrayBuffer32: string must match: ${base62Regex}`);
  s = s.slice(4); // remove the 'a32.' prefix
  let n = 0n;
  for (let i = 0; i < s.length; i++) {
    const digit = BigInt(base62.indexOf(s[i]));
    n = n * 62n + digit;
  }
  // base62 x 43 is slightly more than 256 bits, so we need to check for overflow
  if (n > 2n ** 256n - 1n) throw new Error(`base62ToArrayBuffer32: value exceeds 256 bits.`);
  const buffer = new ArrayBuffer(32);
  const view = new DataView(buffer);
  for (let i = 0; i < 8; i++) {
    const uint32 = Number(BigInt.asUintN(32, n));
    view.setUint32((8 - i - 1) * 4, uint32);
    n = n >> 32n;
  }
  return buffer;
}

/**
 * arrayBuffer32ToBase62 converts an ArrayBuffer32 to a base62 encoded string.
 * 
 * @param buffer ArrayBuffer32
 * @returns base62 encoded string
 */
export function arrayBuffer32ToBase62(buffer: ArrayBuffer): string {
  if (buffer.byteLength !== 32)
    throw new Error('arrayBuffer32ToBase62: buffer must be exactly 32 bytes (256 bits).');
  let result = '';
  for (let n = BigInt('0x' + Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join(''));
    n > 0n;
    n = n / 62n)
    result = base62[Number(n % 62n)] + result;
  return 'a32.' + result.padStart(43, '0');
}

/**
 * base62ToBase64 converts a base62 encoded string to a base64 encoded string.
 * 
 * @param s base62 encoded string
 * @returns base64 encoded string
 * 
 * @throws Error if the string is not a valid base62 encoded string
 */
export function base62ToBase64(s: string): string {
  return arrayBufferToBase64(base62ToArrayBuffer32(s));
}

/**
 * base64ToBase62 converts a base64 encoded string to a base62 encoded string.
 * 
 * @param s base64 encoded string
 * @returns base62 encoded string
 * 
 * @throws Error if the string is not a valid base64 encoded string
 */
export function base64ToBase62(s: string): string {
  return arrayBuffer32ToBase62(base64ToArrayBuffer(s));
}

// and a type guard
export function isBase62Encoded(value: string): value is Base62Encoded {
  return base62Regex.test(value);
}

/**
 * Appends two buffers and returns a new buffer
 * 
 * @param {Uint8Array | ArrayBuffer} buffer1
 * @param {Uint8Array | ArrayBuffer} buffer2
 * @return {ArrayBuffer} new buffer
 *
 */
function _appendBuffer(buffer1: Uint8Array | ArrayBuffer, buffer2: Uint8Array | ArrayBuffer): ArrayBuffer {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
}

/**
 * Returns random number
 *
 * @return {int} integer 0..255
 *
 */
export function simpleRand256() {
  return crypto.getRandomValues(new Uint8Array(1))[0];
}

const base32mi = '0123456789abcdefyhEjkLmNHpFrRTUW';

/**
 * Returns a random string in requested encoding
 *
 * @param {n} number of characters
 * @param {code} encoding, supported types: 'base32mi'
 * @return {string} random string
 *
 * base32mi: ``0123456789abcdefyhEjkLmNHpFrRTUW``
 */
export function simpleRandomString(n: number, code: string): string {
  if (code == 'base32mi') {
    // yeah, of course we need to add base64 etc
    const z = crypto.getRandomValues(new Uint8Array(n));
    let r = '';
    for (let i = 0; i < n; i++) r += base32mi[z[i] & 31];
    return r;
  }
  _sb_exception('simpleRandomString', 'code ' + code + ' not supported');
  return '';
}

/**
 * This function disambiguates strings that are known to be 'base32mi' type.
 * Below is the list of base32 characters, and the disambiguation table.
 * base32mi is designed to be human-friendly, so this function can be 
 * safely called anywhere you have human input - including as an 
 * event on an input field that immediately makes any correction. 
 * 
 * You can think of the translation either in terms of many-to-one
 * (all entered characters that map to a specific base32mi character),
 * or as a one-to-one correspondence (where '.' means 'no change').
 *
 * @example
 *
 *     'base32mi': '0123456789abcdefyhEjkLmNHpFrRTUW'
 * 
 *     Disambiguation transformations:
 * 
 *     [OoQD] -> '0'
 *     [lIiJ] -> '1'
 *     [Zz] -> '2'
 *     [A] -> '4'
 *     [Ss] -> '5'
 *     [G] -> '6'
 *     [t] -> '7'
 *     [B] -> '8'
 *     [gq] -> '9'
 *     [C] -> 'c'
 *     [Y] -> 'y'
 *     [KxX] -> 'k'
 *     [M] -> 'm'
 *     [n] -> 'N'
 *     [P] -> 'p'
 *     [uvV] -> 'U'
 *     [w] -> 'W'
 *
 *     0123456789abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVXYZ
 *     ................9.1..1.N0.9.57UUk.248c0EF6.11kLm.0p0.5..Uky2
 *
 */
export function cleanBase32mi(s: string) {
  // this of course is not the most efficient
  return s.replace(/[OoQD]/g, '0').replace(/[lIiJ]/g, '1').replace(/[Zz]/g, '2').replace(/[A]/g, '4').replace(/[Ss]/g, '5').replace(/[G]/g, '6').replace(/[t]/g, '7').replace(/[B]/g, '8').replace(/[gq]/g, '9').replace(/[C]/g, 'c').replace(/[Y]/g, 'y').replace(/[KxX]/g, 'k').replace(/[M]/g, 'm').replace(/[n]/g, 'N').replace(/[P]/g, 'p').replace(/[uvV]/g, 'U').replace(/[w]/g, 'w');
}

/**
 * Partition
 */
export function partition(str: string, n: number) {
  throw (`partition() not tested on TS yet - (${str}, ${n})`)
}

/**
 * There are many problems with JSON parsing, adding a wrapper to capture more info.
 * The 'loc' parameter should be a (unique) string that allows you to find the usage
 * in the code; one approach is the line number in the file (at some point).
 */
export function jsonParseWrapper(str: string | null, loc: string) {
  if (str == null) return null;
  try {
    return JSON.parse(str);
  } catch (error) {
    // sometimes it's an embedded string
    try {
      // This would be simple: 'return JSON.parse(eval(str));'
      // But eval() not safe. Instead we iteratively strip possible wrapping
      // single or double quotation marks. There are various cases where this
      // will not be enough, but we'll add "unwrapping" logic as we find
      // the examples.
      let s2 = '';
      let s3 = '';
      let str2: string | undefined = str
      while (str2 != (s3 = s2, s2 = str2, str2 = str2?.match(/^(['"])(.*)\1$/m)?.[2]))
        return JSON.parse(`'${s3}'`);
    } catch {
      // let's try one more thing
      try {
        return JSON.parse(str.slice(1, -1));
      } catch {
        // i am beginning to dislike TS .. ugh no simple way to get error message
        // see: https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
        throw new Error(`JSON.parse() error at ${loc} (tried eval and slice)\nString was: ${str}`);
      }
    }
  }
}

/** Essentially a dictionary where each entry is an arraybuffer. */
export interface SBPayload {
  [index: string]: ArrayBuffer;
}

/**
 * Deprecated (older version of payloads, for older channels)
 */
/** @private */
export function extractPayloadV1(payload: ArrayBuffer): SBPayload {
  try {
    const metadataSize = new Uint32Array(payload.slice(0, 4))[0];
    const decoder = new TextDecoder();
    const metadata: Dictionary<any> = jsonParseWrapper(decoder.decode(payload.slice(4, 4 + metadataSize)), 'L476');
    let startIndex = 4 + metadataSize;
    const data: SBPayload = {};
    for (const key in metadata) {
      if (data.key) {
        data[key] = payload.slice(startIndex, startIndex + metadata[key]);
        startIndex += metadata[key];
      }
    }
    return data;
  } catch (e) {
    console.error(e);
    return {};
  }
}

/**
 * Assemble payload. This creates a single binary (wire) format
 * of an arbitrary set of (named) binary objects.
 */
export function assemblePayload(data: SBPayload): BodyInit | null {
  try {
    const metadata: Dictionary<any> = {};
    metadata['version'] = '002';
    let keyCount = 0;
    let startIndex = 0;
    for (const key in data) {
      keyCount++;
      metadata[keyCount.toString()] = { name: key, start: startIndex, size: data[key].byteLength };
      startIndex += data[key].byteLength;
    }
    const encoder = new TextEncoder();
    const metadataBuffer: ArrayBuffer = encoder.encode(JSON.stringify(metadata));
    const metadataSize = new Uint32Array([metadataBuffer.byteLength]);
    let payload = _appendBuffer(new Uint8Array(metadataSize.buffer), new Uint8Array(metadataBuffer));
    for (const key in data)
      payload = _appendBuffer(new Uint8Array(payload), data[key]);
    return payload;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Extract payload - this decodes from our binary (wire) format
 * to a JS object. This provides a binary encoding of any JSON,
 * and it allows some elements of the JSON to be raw (binary).
 */
export function extractPayload(payload: ArrayBuffer): SBPayload {
  try {
    // number of bytes of meta data (encoded as a 32-bit Uint)
    const metadataSize = new Uint32Array(payload.slice(0, 4))[0];
    const decoder = new TextDecoder();
    // extracts the string of meta data and parses
    const _metadata: Dictionary<any> = jsonParseWrapper(decoder.decode(payload.slice(4, 4 + metadataSize)), 'L533');
    // calculate start of actual contents
    const startIndex: number = 4 + metadataSize;
    if (!_metadata.version) _metadata['version'] = '001' // backwards compat
    switch (_metadata['version']) {
      case '001': {
        // deprecated, older format
        return extractPayloadV1(payload);
      }
      case '002': {
        const data: Dictionary<any> = [];
        for (let i = 1; i < Object.keys(_metadata).length; i++) {
          const _index = i.toString();
          if (_metadata[_index]) {
            const propertyStartIndex: number = _metadata[_index]['start'];
            // start (in bytes) of contents
            const size: number = _metadata[_index]['size'];
            // where to put it
            const entry: Dictionary<any> = _metadata[_index]
            // extracts contents - this supports raw data
            data[entry['name']] = payload.slice(startIndex + propertyStartIndex, startIndex + propertyStartIndex + size);
          } else {
            console.log(`found nothing for index ${i}`)
          }
        }
        return data;
      }
      default: {
        throw new Error('Unsupported payload version (' + _metadata['version'] + ') - fatal');
      }
    }
  } catch (e) {
    throw new Error('extractPayload() exception (' + e + ')');
  }
}

/**
 * Encode into b64 URL
 */
export function encodeB64Url(input: string) {
  return input.replaceAll('+', '-').replaceAll('/', '_');
}

/**
 * Decode b64 URL
 */
export function decodeB64Url(input: string) {
  input = input.replaceAll('-', '+').replaceAll('_', '/');

  // Pad out with standard base64 required padding characters
  const pad: number = input.length % 4;
  if (pad) {
    if (pad === 1) {
      throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
    }
    input += new Array(5 - pad).join('=');
  }

  return input;
}

//#endregion - SBCryptoUtils

/******************************************************************************************************/
//#region - SBCrypto Class - this is instantiated into 'sbCrypto' global

type knownKeysInfo = {
  hash: SB384Hash, // also the map hash
  pubKeyJson?: JsonWebKey, // if we only have crypto key and it's not extractable, this will be undefined
  key?: CryptoKey, // exists iff it's a private key
}



/**
 * SBCrypto
 *
 * SBCrypto contains all the SB specific crypto functions,
 * as well as some general utility functions.
 *
 * @class
 * @constructor
 * @public
 */
class SBCrypto {  /************************************************************************************/

  #knownKeys: Map<SB384Hash, knownKeysInfo> = new Map()

  /**
   * SBCrypto.addKnownKey()
   * 
   * Adds any key to the list of known keys; if it's known
   * but only as a public key, then it will be 'upgraded'.
   */
  async addKnownKey(key: JsonWebKey | SB384 | CryptoKey) {
    if (!key)
      // various valid cases are no ops
      return
    // check on types first
    if (typeof key === 'string') {
      // JsonWebKey can be private or public
      const hash = await sbCrypto.sb384Hash(key)
      if (!hash)
        return
      if (this.#knownKeys.has(hash)) {
        // ToDo: check if it's a private key that would upgrade what's there
        if (DBG) console.log(`addKnownKey() - key already known: ${hash}, skipping upgrade check`)
      } else {
        const newInfo: knownKeysInfo = {
          hash: hash, // also the map hash
          pubKeyJson: key,
          key: await sbCrypto.importKey('jwk', key, 'ECDH', true, ['deriveKey'])
        }
        this.#knownKeys.set(hash, newInfo)
      }
    } else if (key instanceof SB384) {
      // SB384 is always private
      await key.ready // just in case
      const hash = key.hash
      // todo: perhaps check if it's there, but for now just overwrite
      const newInfo: knownKeysInfo = {
        hash: hash, // also the map hash
        pubKeyJson: key.exportable_pubKey,
        key: key.privateKey, // exists iff it's a private key
      }
      this.#knownKeys.set(hash, newInfo)
    } else if (key instanceof CryptoKey) {
      // CryptoKey can be private or public
      const hash = await this.sb384Hash(key)
      if (!hash)
        return
      if (!this.#knownKeys.has(hash)) {
        const newInfo: knownKeysInfo = {
          hash: hash, // also the map hash
          pubKeyJson: await sbCrypto.exportKey('jwk', key),
          key: key, // todo: could be public
        }
        this.#knownKeys.set(hash, newInfo)
      }
    } else {
      throw new Error("addKnownKey() - invalid key type (must be string or SB384-derived)")
    }
  }

  /**
   * SBCrypto.lookupKeyGlobal()
   * 
   * Given any sort of SB384Hash, returns the corresponding known key, if any
   */
  lookupKeyGlobal(hash: SB384Hash): knownKeysInfo | undefined {
    return this.#knownKeys.get(hash)
  }
  /**
   * Hashes and splits into two (h1 and h1) signature of data, h1
   * is used to request (salt, iv) pair and then h2 is used for
   * encryption (h2, salt, iv)
   *
   * @param buf blob of data to be stored
   *
   */
  generateIdKey(buf: ArrayBuffer): Promise<{ id: string, key: string }> {
    return new Promise((resolve, reject) => {
      try {
        crypto.subtle.digest('SHA-512', buf).then((digest) => {
          const _id = digest.slice(0, 32);
          const _key = digest.slice(32);
          resolve({
            id: arrayBufferToBase64(_id),
            key: arrayBufferToBase64(_key)
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * Extracts (generates) public key from a private key.
   */
  extractPubKey(privateKey: JsonWebKey): JsonWebKey | null {
    try {
      const pubKey: JsonWebKey = { ...privateKey };
      delete pubKey.d;
      delete pubKey.dp;
      delete pubKey.dq;
      delete pubKey.q;
      delete pubKey.qi;
      pubKey.key_ops = [];
      return pubKey;
    } catch (e) {
      console.error(e)
      return null
    }
  }

  /** @private */
  async #generateHash(rawBytes: ArrayBuffer): Promise<SB384Hash> {
    try {
      const MAX_REHASH_ITERATIONS = 160
      const b62regex = /^[0-9A-Za-z]+$/;
      let count = 0
      let hash = arrayBufferToBase64(rawBytes)
      while (!b62regex.test(hash)) {
        if (count++ > MAX_REHASH_ITERATIONS) throw new Error(`generateChannelHash() - exceeded ${MAX_REHASH_ITERATIONS} iterations:`)
        rawBytes = await crypto.subtle.digest('SHA-384', rawBytes)
        hash = arrayBufferToBase64(rawBytes)
      }
      return arrayBufferToBase64(rawBytes)
    } catch (e) {
      console.error("sb384Hash() failed", e)
      console.error("tried working from channelBytes:")
      console.error(rawBytes)
      throw new Error(`sb384Hash() exception (${e})`)
    }
  }

  // nota bene this does, and should, permanently be backwards compatible.
  /** @private */
  async #testHash(channelBytes: ArrayBuffer, channel_id: SBChannelId): Promise<boolean> {
    const MAX_REHASH_ITERATIONS = 160
    let count = 0
    let hash = arrayBufferToBase64(channelBytes)
    while (hash !== channel_id) {
      if (count++ > MAX_REHASH_ITERATIONS) return false
      channelBytes = await crypto.subtle.digest('SHA-384', channelBytes)
      hash = arrayBufferToBase64(channelBytes)
    }
    return true
  }

  /**
   * SBCrypto.sb384Hash()
   * 
   * Takes a JsonWebKey and creates the SB384Hash. Returns
   * 
   */
  async sb384Hash(key?: JsonWebKey | CryptoKey): Promise<SB384Hash | undefined> {
    if (key instanceof CryptoKey)
      key = await this.exportKey('jwk', key)
        .catch(() => {
          // typically it's a restricted key
          return undefined
        })
    if (!key)
      return undefined
    if (key && key.x && key.y) {
      const xBytes = base64ToArrayBuffer(decodeB64Url(key!.x!))
      const yBytes = base64ToArrayBuffer(decodeB64Url(key!.y!))
      const channelBytes = _appendBuffer(xBytes, yBytes)
      return await this.#generateHash(channelBytes)
    } else {
      throw new Error('sb384Hash() - invalid key (JsonWebKey) - missing x and/or y')
    }
  }

  /**
   * SBCrypto.compareHashWithKey()
   * 
   * Checks if an existing SB384Hash is 'compatible' with a given key.
   * 
   * Note that you CAN NOT have a hash, and a key, generate a hash
   * from that key, and then compare the two. The hash generation per
   * se will be deterministic and specific AT ANY POINT IN TIME,
   * but may change over time, and this comparison function will 
   * maintain ability to compare over versions.
   * 
   * For example, this comparison will accept a simple straight
   * b64-encoded hash without iteration or other processing.
   * 
   */
  async compareHashWithKey(hash: SB384Hash, key: JsonWebKey) {
    if (!hash || !key) return false
    let x = key.x
    let y = key.y
    if (!(x && y)) {
      try {
        // we try to be tolerant of code that loses track of if JWK has been parsed or not
        const tryParse = JSON.parse(key as unknown as string);
        if (tryParse.x) x = tryParse.x;
        if (tryParse.y) y = tryParse.y;
      } catch {
        return false;
      }
    }
    const xBytes = base64ToArrayBuffer(decodeB64Url(x!))
    const yBytes = base64ToArrayBuffer(decodeB64Url(y!))
    const channelBytes = _appendBuffer(xBytes, yBytes)
    return await this.#testHash(channelBytes, hash)
  }


  /**
   * 'Compare' two channel IDs. Note that this is not constant time.
   */
  async verifyChannelId(owner_key: JsonWebKey, channel_id: SBChannelId): Promise<boolean> {
    return await this.compareHashWithKey(channel_id, owner_key)
  }

  /**
   * SBCrypto.generatekeys()
   *
   * Generates standard ``ECDH`` keys using ``P-384``.
   */
  async generateKeys() {
    try {
      return await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-384' }, true, ['deriveKey']);
    } catch (e) {
      throw new Error('generateKeys() exception (' + e + ')');
    }
  }

  /**
   * SBCrypto.importKey()
   *
   * Import keys
   */
  async importKey(format: KeyFormat, key: BufferSource | JsonWebKey, type: 'ECDH' | 'AES' | 'PBKDF2', extractable: boolean, keyUsages: KeyUsage[]) {
    try {
      let importedKey: CryptoKey
      const keyAlgorithms = {
        ECDH: { name: 'ECDH', namedCurve: 'P-384' },
        AES: { name: 'AES-GCM' },
        PBKDF2: 'PBKDF2'
      }
      if (format === 'jwk') {
        // sanity check it's a JsonWebKey and not a BufferSource or something else
        const jsonKey = key as JsonWebKey
        if (jsonKey.kty === undefined) throw new Error('importKey() - invalid JsonWebKey');
        if (jsonKey.alg === 'ECDH')
          jsonKey.alg = undefined; // todo: this seems to be a Deno mismatch w crypto standards?
        importedKey = await crypto.subtle.importKey('jwk', jsonKey, keyAlgorithms[type], extractable, keyUsages)
      } else {
        importedKey = await crypto.subtle.importKey(format, key as BufferSource, keyAlgorithms[type], extractable, keyUsages)
      }
      this.addKnownKey(importedKey)
      return (importedKey)
    } catch (e) {
      console.error(`... importKey() error: ${e}:`)
      console.log(format)
      console.log(key)
      console.log(type)
      console.log(extractable)
      console.log(keyUsages)
      throw new Error('importKey() exception (' + e + ')');
    }
  }

  /**
   * SBCrypto.exportKey()
   * 
   * Export key; note that if there's an issue, this will return undefined.
   * That can happen normally if for example the key is restricted (and
   * not extractable).
   */
  async exportKey(format: 'jwk', key: CryptoKey) {
    return await crypto.subtle
      .exportKey(format, key)
      .catch(() => {
        if (DBG) console.warn(`... exportKey() protested, this just means we treat this as undefined`)
        return undefined
      })
  }

  /**
   * SBCrypto.deriveKey()
   *
   * Derive key. Takes a private and public key, and returns a Promise to a cryptoKey for 1:1 communication.
   */
  deriveKey(privateKey: CryptoKey, publicKey: CryptoKey, type: string, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey> {
    return new Promise(async (resolve, reject) => {
      const keyAlgorithms: Dictionary<any> = {
        AES: {
          name: 'AES-GCM', length: 256
        }, HMAC: {
          name: 'HMAC', hash: 'SHA-256', length: 256
        }
      };
      try {
        resolve(await crypto.subtle.deriveKey({
          name: 'ECDH',
          public: publicKey
        },
          privateKey,
          keyAlgorithms[type],
          extractable,
          keyUsages));
      } catch (e) {
        console.error(e, privateKey, publicKey, type, extractable, keyUsages);
        reject(e);
      }
    });
  }

  /**
   * SBCrypto.encrypt()
   *
   * Encrypt. if no nonce (iv) is given, will create it. Returns a Promise
   * that resolves either to raw array buffer or a packaged EncryptedContents.
   * Note that for the former, nonce must be given.
   */
  encrypt(data: BufferSource, key: CryptoKey, _iv?: Uint8Array | null, returnType?: 'encryptedContents'): Promise<EncryptedContents>
  encrypt(data: BufferSource, key: CryptoKey, _iv?: Uint8Array | null, returnType?: 'arrayBuffer'): Promise<ArrayBuffer>
  encrypt(data: BufferSource, key: CryptoKey, _iv?: Uint8Array, returnType: 'encryptedContents' | 'arrayBuffer' = 'encryptedContents'): Promise<EncryptedContents | ArrayBuffer> {
    return new Promise(async (resolve, reject) => {
      try {
        if (data === null)
          reject(new Error('no contents'))
        const iv: Uint8Array = ((!_iv) || (_iv === null)) ? crypto.getRandomValues(new Uint8Array(12)) : _iv
        if (typeof data === 'string')
          data = (new TextEncoder()).encode(data)
        const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, data)
        if (returnType === 'encryptedContents') {
          resolve({
            content: ensureSafe(arrayBufferToBase64(encrypted)),
            iv: ensureSafe(arrayBufferToBase64(iv))
          })
        } else {
          resolve(encrypted)
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  wrap(k: CryptoKey, b: string, bodyType: 'string'): Promise<EncryptedContents>
  wrap(k: CryptoKey, b: ArrayBuffer, bodyType: 'arrayBuffer'): Promise<EncryptedContents>
  wrap(k: CryptoKey, b: string | ArrayBuffer, bodyType: 'string' | 'arrayBuffer'): Promise<EncryptedContents> {
    return new Promise<EncryptedContents>((resolve) => {
      let a
      if (bodyType === 'string') {
        a = sbCrypto.str2ab(b as string)
      } else {
        a = b as ArrayBuffer
      }
      sbCrypto.encrypt(a, k).then((c) => { resolve(c) })
    })
  }

  /**
   * SBCrypto.unwrap
   *
   * Decrypts a wrapped object, returns (promise to) decrypted contents
   * per se (either as a string or arrayBuffer)
   */
  unwrap(k: CryptoKey, o: EncryptedContents, returnType: 'string'): Promise<string>
  unwrap(k: CryptoKey, o: EncryptedContents, returnType: 'arrayBuffer'): Promise<ArrayBuffer>
  unwrap(k: CryptoKey, o: EncryptedContents, returnType: 'string' | 'arrayBuffer') {
    return new Promise(async (resolve, reject) => {
      try {
        const { content: t, iv: iv } = encryptedContentsMakeBinary(o)
        const d = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, k, t)
        if (returnType === 'string')
          resolve(new TextDecoder().decode(d))
        else if (returnType === 'arrayBuffer')
          resolve(d)
      } catch (e) {
        console.error(`unwrap(): unknown issue - rejecting: ${e}`)
        console.trace()
        reject(e);
      }
    });
  }

  /**
   * SBCrypto.sign()
   *
   * Sign
   */
  sign(secretKey: CryptoKey, contents: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const encoder = new TextEncoder();
        const encoded = encoder.encode(contents);
        let sign;
        try {
          sign = await crypto.subtle.sign('HMAC', secretKey, encoded)
          resolve(ensureSafe(arrayBufferToBase64(sign)));
        } catch (error) {
          reject(error);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * SBCrypto.verify()
   *
   * Verify signature.
   */
  verify(verifyKey: CryptoKey, sign: string, contents: string) {
    return new Promise<boolean>((resolve, reject) => {
      try {
        crypto.subtle
          .verify('HMAC',
            verifyKey,
            base64ToArrayBuffer(sign),
            sbCrypto.str2ab(contents))
          .then((verified) => { resolve(verified) })
      } catch (e) { reject(WrapError(e)) }
    })
  }

  /**
   * Standardized 'str2ab()' function, string to array buffer.
   * This assumes on byte per character.
   *
   * @param {string} string
   * @return {Uint8Array} buffer
   */
  str2ab(string: string): Uint8Array {
    return new TextEncoder().encode(string);
  }

  /**
   * Standardized 'ab2str()' function, array buffer to string.
   * This assumes one byte per character.
   *
   * @param {Uint8Array} buffer
   * @return {string} string
   */
  ab2str(buffer: Uint8Array): string {
    return new TextDecoder('utf-8').decode(buffer);
  }

  /**
   * SBCrypto.compareKeys()
   *
   * Compare JSON keys, true if the 'same', false if different. We consider
   * them "equal" if both have 'x' and 'y' properties and they are the same.
   * (Which means it doesn't care about which or either being public or private)
   */
  compareKeys(key1: Dictionary<any>, key2: Dictionary<any>): boolean {
    if (key1 != null && key2 != null && typeof key1 === 'object' && typeof key2 === 'object')
      return key1['x'] === key2['x'] && key1['y'] === key2['y'];
    return false;
  }

  /**
   * SBCrypto.lookupKey()
   *
   * Uses compareKeys() to check for presense of a key in a list of keys.
   * Returns index of key if found, -1 if not found.
   * 
   */
  lookupKey(key: JsonWebKey, array: Array<JsonWebKey>): number {
    for (let i = 0; i < array.length; i++)
      if (sbCrypto.compareKeys(key, array[i])) return i;
    return -1;
  }

  async channelKeyStringsToCryptoKeys(keyStrings: ChannelKeyStrings): Promise<ChannelKeys> {
    return new Promise(async (resolve, reject) => {
      let ownerKeyParsed: JsonWebKey = jsonParseWrapper(keyStrings.ownerKey, 'L1513')
      Promise.all([
        sbCrypto.importKey('jwk', ownerKeyParsed, 'ECDH', false, []),
        sbCrypto.importKey('jwk', jsonParseWrapper(keyStrings.encryptionKey, 'L2250'), 'AES', false, ['encrypt', 'decrypt']),
        sbCrypto.importKey('jwk', jsonParseWrapper(keyStrings.signKey, 'L2251'), 'ECDH', true, ['deriveKey']),
        sbCrypto.importKey('jwk', sbCrypto.extractPubKey(jsonParseWrapper(keyStrings.signKey, 'L2252'))!, 'ECDH', true, []),
        // this.identity!.privateKey // we know we have id by now
      ])
        .then(async (v) => {
          if (DBG) console.log("++++++++ readyPromise() processed first batch of keys")
          const ownerKey = v[0]
          const encryptionKey = v[1]
          const signKey = v[2]
          const publicSignKey = v[3]
          resolve({
            ownerKey: ownerKey,
            ownerPubKeyX: ownerKeyParsed.x!,
            encryptionKey: encryptionKey,
            signKey: signKey,
            // channelSignKey: channelSignKey,
            publicSignKey: publicSignKey
          })
        })
        .catch((e) => {
          console.error(`readyPromise(): failed to import keys: ${e}`)
          reject(e)
        })
    })


  }

} /* SBCrypto */
//#endregion - SBCrypto Class

/******************************************************************************************************/
//#region Decorators

// Decorator
/** @private */
function Memoize(target: any, propertyKey: string /* ClassGetterDecoratorContext */, descriptor?: PropertyDescriptor) {
  if ((descriptor) && (descriptor.get)) {
    let get = descriptor.get
    descriptor.get = function () {
      const prop = `__${target.constructor.name}__${propertyKey}__`
      if (this.hasOwnProperty(prop)) {
        const returnValue = this[prop as keyof PropertyDescriptor]
        return (returnValue)
      } else {
        const returnValue = get.call(this)
        Object.defineProperty(this, prop, { configurable: false, enumerable: false, writable: false, value: returnValue })
        return returnValue
      }
    }
  }
}

// Decorator
/** @private */
function Ready(target: any, propertyKey: string /* ClassGetterDecoratorContext */, descriptor?: PropertyDescriptor) {
  if ((descriptor) && (descriptor.get)) {
    let get = descriptor.get
    descriptor.get = function () {
      const obj = target.constructor.name
      const prop = `${obj}ReadyFlag`
      if (prop in this) {
        const rf = "readyFlag" as keyof PropertyDescriptor
        _sb_assert(this[rf], `${propertyKey} getter accessed but object ${obj} not ready (fatal)`)
      }
      const retValue = get.call(this)
      _sb_assert(retValue != null, `${propertyKey} getter accessed in object type ${obj} but returns NULL (fatal)`)
      return retValue
    }
  }
}

const SB_CLASS_ARRAY = ['SBMessage', 'SBObjectHandle'] as const
type SB_CLASS_TYPES = typeof SB_CLASS_ARRAY[number]
type SB_CLASSES = SBMessage | SBObjectHandle

const SB_MESSAGE_SYMBOL = Symbol.for('SBMessage')
const SB_OBJECT_HANDLE_SYMBOL = Symbol.for('SBObjectHandle')

function isSBClass(s: any): boolean {
  return typeof s === 'string' && SB_CLASS_ARRAY.includes(s as SB_CLASS_TYPES)
}

function SBValidateObject(obj: SBObjectHandle, type: 'SBObjectHandle'): boolean
function SBValidateObject(obj: SBMessage, type: 'SBMessage'): boolean
function SBValidateObject(obj: SB_CLASSES | any, type: SB_CLASS_TYPES): boolean {
  switch (type) {
    case 'SBMessage': return SB_MESSAGE_SYMBOL in obj
    case 'SBObjectHandle': return SB_OBJECT_HANDLE_SYMBOL in obj
  }
}

// Decorator
/** @private */
function VerifyParameters(_target: any, _propertyKey: string /* ClassMethodDecoratorContext */, descriptor?: PropertyDescriptor): any {
  if ((descriptor) && (descriptor.value)) {
    const operation = descriptor.value
    descriptor.value = function (...args: any[]) {
      for (let x of args) {
        const m = x.constructor.name
        if (isSBClass(m)) _sb_assert(SBValidateObject(x, m), `invalid parameter: ${x} (expecting ${m})`)
      }
      return operation.call(this, ...args)
    }
  }
}

// // variation of "ready" pattern: an object is ready whenever it's validated,
// // and any setter that might impact this needs to be decorated. 
// function Validate(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
//   const operation = descriptor.value
//   descriptor.value = function (...args: any[]) {
//     for (let x of args) {
//       const m = x.constructor.name
//       if (isSBClass(m)) _sb_assert(SBValidateObject(x, m), `invalid parameter: ${x} (expecting ${m})`)
//     }
//     return operation.call(this, ...args)
//   }
// 

// Decorator
/** @private */
function ExceptionReject(target: any, _propertyKey: string /* ClassMethodDecoratorContext */, descriptor?: PropertyDescriptor) {
  if ((descriptor) && (descriptor.value)) {
    const operation = descriptor.value
    descriptor.value = function (...args: any[]) {
      try {
        return operation.call(this, ...args)
      } catch (e) {
        console.log(`ExceptionReject: ${WrapError(e)}`)
        console.log(target)
        console.log(_propertyKey)
        console.log(descriptor)
        return new Promise((_resolve, reject) => reject(`Reject: ${WrapError(e)}`))
      }
    }
  }
}

//#endregion - local decorators

/******************************************************************************************************/
//#region - SETUP and STARTUP stuff (in progress)

/**
 * This is the GLOBAL SBCrypto object, which is instantiated
 * immediately upon loading the jslib library.
 * 
 * You should use this guy, not instantiate your own.
 */
const sbCrypto = new SBCrypto();


/**
 * List of known servers. Nota bene: known does not mean *trusted*;
 * currently this will be mostly development servers. Please let us
 * know if there are global servers you would like us to add.
 */
const SBKnownServers: Array<SBServer> = [
  {
    // Preview / Development Servers
    channel_server: 'https://channel.384co.workers.dev',
    channel_ws: 'wss://channel.384co.workers.dev',
    storage_server: 'https://storage.384co.workers.dev',
    shard_server: 'https://shard.3.8.4.land'
  },
  {
    // This is both "384.chat" (production) and "sn.ac"
    channel_server: 'https://r.384co.workers.dev',
    channel_ws: 'wss://r.384co.workers.dev',
    storage_server: 'https://s.384co.workers.dev'
  },
]

// let availableReadServers = new Promise<Array<string>>((resolve, _reject) => {
//   const servers = [ 'http://localhost:3841', 'http://localhost:4000' ]
//   Promise.all(servers.map(async (server) => {
//     try {
//       const methods = (await SBFetch(server + '/api/version'));
//       const methodsJson = await methods.json();
//       return { server, canRead: methodsJson.read, canWrite: methodsJson.write };
//     } catch {
//       return { server, canRead: false, canWrite: false };
//     }
//   })).then((capabilities) => {
//     let readServers = capabilities.filter(c => c.canRead).map(c => c.server);
//     readServers.push('https://shard.3.8.4.land');
//     readServers.push('https://storage.384co.workers.dev'); 
//     console.warn("NOTE: ignore any 'ERR_CONNECTION_REFUSED' errors immediately above, they were expected\n"
//     + "(they are due to a limitation in your browser, making it impossible to silently verify connections)\n")
//     resolve(readServers);
//   });
// });

// const sbSetup = new Promise(async (resolve, _reject) => {
//   await availableReadServers;
//   resolve(availableReadServers)

//   // try {
//   //   const version = await SBFetch('http://localhost:3841/api/version')
//   //   console.log('sbSetup() - version:')
//   //   // let's list all headers:
//   //   for (let h of (version.headers as any).entries()) {
//   //     console.log(h)
//   //   }
//   //   version.json().then((v) => {
//   //     console.log(v)
//   //     resolve(v)
//   //   })
//   // } catch (e) {
//   //   console.error(`sbSetup() - failed to fetch version: ${e}`)
//   //   reject(e)
//   // }
// });

// sbSetup.then((v) => {
//   console.log("sbSetup() - success:")
//   console.log(v)
// }).catch((e) => {
//   console.error(`sbSetup() - failed to fetch version: ${e}`)
// })



//#endregion - SETUP and STARTUP stuff

/******************************************************************************************************/
//#region - SB384 Class

/**
 *
 * @class
 * @constructor
 * @public
 *
 */
class SB384 {
  ready: Promise<SB384>
  sb384Ready: Promise<SB384>
  #SB384ReadyFlag: boolean = false // must be named <class>ReadyFlag

  #exportable_pubKey?: JsonWebKey
  #exportable_privateKey?: JsonWebKey
  #privateKey?: CryptoKey

  #hash?: string // generic 'identifier' in the SB universe

  // #keyPair: CryptoKeyPair | null = null

  /**
   * Basic (core) capability object in SB.
   *
   * Note that all the getters below will throw an exception if the
   * corresponding information is not ready.
   *
   * Like most SB classes, SB384 follows the "ready template" design
   * pattern: the object is immediately available upon creation,
   * but isn't "ready" until it says it's ready. See `Channel Class`_
   * example below. Also see Design Note [4]_.
   * 
   * { @link https://snackabra.io/jslib.html#dn-004-the-ready-pattern }
   *
   * @param key a jwk with which to create identity; if not provided,
   * it will 'mint' (generate) them randomly, in other words it will
   * default to creating a new identity ("384").
   *
   */
  constructor(key?: JsonWebKey) {
    this.ready = new Promise<SB384>(async (resolve, reject) => {
      try {
        if (key) {
          if (!key.d) {
            // make sure key.d is present in the key, or it's probably a public key
            const msg = 'ERROR creating SB384 object: invalid key (must be a PRIVATE key)'
            console.error(msg)
            reject(msg)
          }
          // we're given a key, and try to use it
          this.#exportable_privateKey = key
          const pk = sbCrypto.extractPubKey(key)
          _sb_assert(pk, 'unable to extract public key')
          this.#exportable_pubKey = pk!
          this.#privateKey = await sbCrypto.importKey('jwk', key, 'ECDH', true, ['deriveKey'])
        } else {
          // generate a fresh ID
          const keyPair = await sbCrypto.generateKeys()
          this.#privateKey = keyPair.privateKey
          this.#exportable_pubKey = await sbCrypto.exportKey('jwk', keyPair.publicKey)
          this.#exportable_privateKey = await sbCrypto.exportKey('jwk', keyPair.privateKey)
        }
        this.#hash = await sbCrypto.sb384Hash(this.#exportable_pubKey)
        sbCrypto.addKnownKey(this)
        this.#SB384ReadyFlag = true
        resolve(this)
      } catch (e) {
        reject('ERROR creating SB384 object failed: ' + WrapError(e))
      }
    })
    this.sb384Ready = this.ready
  }

  /** @type {boolean}       */ @Memoize get readyFlag() { return this.#SB384ReadyFlag }
  /** @type {JsonWebKey}    */ @Memoize @Ready get exportable_pubKey() { return this.#exportable_pubKey! }
  /** @type {JsonWebKey}    */ @Memoize @Ready get exportable_privateKey() { return this.#exportable_privateKey! }
  /** @type {CryptoKey}     */ @Memoize @Ready get privateKey() { return this.#privateKey! }
  /** @type {CryptoKeyPair} */ // @Memoize @Ready get keyPair() { return this.#keyPair }

  // note: this is the channelID if this SB384 corresponds to an owner ...
  /** @type {string}        */ @Memoize @Ready get ownerChannelId() { return this.hash }

  /**
   * Returns a unique identifier for external use, that will be unique
   * for any class or object that uses SB384 as it's root.
   * 
   * This is deterministic, used to identify users, channels, etc.
   * 
   * The hash is base64 encoding of the SHA-384 hash of the public key,
   * taking the 'x' and 'y' fields. Note that it is slightly restricted, it only
   * allows [A-Za-z0-9], eg does not allow the '_' or '-' characters. This makes the
   * encoding more practical for end-user interactions like copy-paste. This
   * is accomplished by simply re-hashing until the result is valid. This 
   * reduces the entropy of the channel ID by a neglible amount. 
   * 
   * Note this is not b62 encoding, which we use for 256-bit entities. This
   * is still ~384 bits (e.g. x and y fields are each 384 bits, but of course
   * the underlying total entropy isn't that, see <insert lots of fun math crypto
   * study material heh>).
   * 
   * NOTE: if you ever need to COMPARE hashes, well short version is that
   * you cannot do so in the general case. You can use sbCrypto.compareHashWithKey()
   * to compare a hash with a key, but you cannot compare two hashes. See the
   * comparison function for more details.
   */
  @Memoize @Ready get hash() { return this.#hash! }

  // older approach, used in similar contexts as hash() above
  @Memoize @Ready get _id() { return JSON.stringify(this.exportable_pubKey!) }

} /* class SB384 */
//#endregion - SB384 Class

/**
 * Class SBMessage
 *
 * Body should be below 32KiB, though it tolerates up to 64KiB
 * 
 * 
 *
 * @class
 * @constructor
 * @public
 */
class SBMessage {
  ready
  channel: Channel
  contents: SBMessageContents
  #encryptionKey?: CryptoKey
  #sendToPubKey?: JsonWebKey
  [SB_MESSAGE_SYMBOL] = true
  MAX_SB_BODY_SIZE = 64 * 1024 * 1.5 // allow for base64 overhead plus extra

  /* SBMessage */
  constructor(channel: Channel, bodyParameter: SBMessageContents | string = '', sendToJsonWebKey?: JsonWebKey) {
    if (typeof bodyParameter === 'string') {
      this.contents = { encrypted: false, isVerfied: false, contents: bodyParameter, sign: '', image: '', imageMetaData: {} }
    } else {
      this.contents = { encrypted: false, isVerfied: false, contents: '', sign: '', image: bodyParameter.image, imageMetaData: bodyParameter.imageMetaData }
    }
    let body = this.contents
    let bodyJson = JSON.stringify(body)
    if (sendToJsonWebKey) this.#sendToPubKey = sbCrypto.extractPubKey(sendToJsonWebKey)!

    _sb_assert(bodyJson.length < this.MAX_SB_BODY_SIZE,
      `SBMessage(): body must be smaller than ${this.MAX_SB_BODY_SIZE / 1024} KiB (we got ${bodyJson.length / 1024})})`)
    this.channel = channel
    this.ready = new Promise<SBMessage>((resolve) => {
      // console.log(channel)
      channel.channelReady.then(async () => {
        this.contents.sender_pubKey = this.channel.exportable_pubKey!
        if (channel.userName) this.contents.sender_username = channel.userName
        const signKey = this.channel.channelSignKey
        const sign = sbCrypto.sign(signKey, body.contents)
        const image_sign = sbCrypto.sign(signKey!, this.contents.image)
        const imageMetadata_sign = sbCrypto.sign(signKey, JSON.stringify(this.contents.imageMetaData))
        if (this.#sendToPubKey) {
          this.#encryptionKey = await sbCrypto.deriveKey(
            this.channel.privateKey,
            await sbCrypto.importKey("jwk", this.#sendToPubKey, "ECDH", true, []),
            "AES", false, ["encrypt", "decrypt"]
          )
        } else {
          this.#encryptionKey = this.channel.keys.encryptionKey
        }
        Promise.all([sign, image_sign, imageMetadata_sign]).then((values) => {
          this.contents.sign = values[0]
          this.contents.image_sign = values[1]
          this.contents.imageMetadata_sign = values[2]
          // NOTE: mtg:adding this breaks messages... but I dont understand why
          // const isVerfied = await this.channel.api.postPubKey(this.channel.exportable_pubKey!)
          // console.log('here',isVerfied)
          // this.contents.isVerfied = isVerfied?.success ? true : false
          // console.log(this)
          resolve(this)
        })
      })
    })
  }

  @Ready get encryptionKey() { return this.#encryptionKey }
  get sendToPubKey() { return this.#sendToPubKey }

  /**
   * SBMessage.send()
   *
   * @param {SBMessage} message - the message object to send
   */
  send() {
    return new Promise<string>((resolve, reject) => {
      this.ready.then(() => {
        this.channel.send(this).then((result) => {
          if (result === "success") {
            resolve(result)
          } else {
            reject(result)
          }
        })
      })
    })
    // TODO: i've punted on queue here <--- queueMicrotaks maybe?
  }
} /* class SBMessage */


/**
 * Channel Class
 *
 * Join a channel, returns channel object.
 *
 * Currently, you must have an identity when connecting, because every single
 * message is signed by sender. TODO is to look at how to provide a 'listening'
 * mode on channels.
 *
 * Most classes in SB follow the "ready" template: objects can be used
 * right away, but they decide for themselves if they're ready or not.
 */
abstract class Channel extends SB384 {
  /**
   * Channel Class
   * 
   * This is the main work horse for channels. However, it is ABSTRACT,
   * meaning you need a 'concrete' class to use it.
   * 
   * Currently you have two options:
   * 
   * You can create a ChannelEndpoint object. That can do everything against
   * a channel except send/receive messages synchronously.
   * 
   * The other option is ChannelSocket, which does everything ChannelEndpoint
   * does, but ALSO connects with a web socket.
   * 
   * So unless you're actually connecting with intent on interactive, fast
   * messaging, an endpoint is sufficient. In fact, UNLESS you are going to
   * do send/receive, you should use ChannelEndpoint, not ChannelSocket.
   * 
   * In our current thinking, 'Channel' captures pretty much everything, 
   * except how you want (instant) messaging to be hooked up. So for example, our
   * next class might be 'ChannelP2P', which would be setting up webrtc
   * data channel connections in a mesh.
   * 
   * Note that you don't need to worry about what API calls involve race
   * conditions and which don't, jslib will do that for you.
   * 
   * @param Snackabra - server to join
   * @param JsonWebKey - key to use to join (optional)
   * @param string - the <a href="../glossary.html#term-channel-name">Channel Name</a> to find on that server (optional)
   * 
   */

  // ready: Promise<Channel>
  channelReady: Promise<Channel>
  #ChannelReadyFlag: boolean = false // must be named <class>ReadyFlag

  #sbServer: SBServer
  motd?: string = ''
  locked?: boolean = false
  owner: boolean = false
  admin: boolean = false
  adminData?: Dictionary<any> // TODO: make into getter

  verifiedGuest: boolean = false
  userName: string = ''

  #channelKeys?: ChannelKeys;
  #channelSignKey?: CryptoKey;
  #channelId?: string

  #cursor: string = ''; // last (oldest) message key seen
  #channelApi: string = '';
  #channelServer: string = '';

  abstract send(message: SBMessage): Promise<string>

  constructor(sbServer: SBServer, key?: JsonWebKey, channelId?: string) {
    console.log("CONSTRUCTOR new channel")
    _sb_assert(channelId, "Channel(): as of jslib 1.1.x the channelId must be provided")
    super(key)
    this.#sbServer = sbServer
    this.#channelId = channelId
    this.#channelApi = sbServer.channel_server + '/api/'
    this.#channelServer = sbServer.channel_server + '/api/room/'

    this.channelReady = new Promise<Channel>(async (resolve, reject) => {
      await this.sb384Ready
      // xTODO: check all known servers for this channel
      SBFetch(this.#sbServer.channel_server + '/api/room/' + this.#channelId + '/getChannelKeys',
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response: Response) => {
          if (!response.ok)
            reject("ChannelEndpoint(): failed to get channel keys (network response not ok)");
          return response.json() as unknown as ChannelKeyStrings // continues processing below
        })
        .then(async (data) => {
          if (data.error)
            reject("ChannelEndpoint(): failed to get channel keys (error in response)");
          await this.#loadKeys(data)
          // now we're ready
          this.#ChannelReadyFlag = true
          resolve(this)
        })
        .catch((e: Error) => { reject("ChannelApi Error [1]: " + WrapError(e)) })
    })
  }

  /** @private */
  async #setKeys(k: ChannelKeys) {
    this.#channelKeys = k
    if (DBG) {
      console.log("set channelkeys to 'k':")
      console.log(k)
    }
    _sb_assert(this.#channelKeys, "Channel.importKeys: no channel keys (?)")
    _sb_assert(this.#channelKeys!.publicSignKey, "Channel.importKeys: no public sign key (?)")
    _sb_assert(this.privateKey, "Channel.importKeys: no private key (?)")
    this.#channelSignKey = await sbCrypto.deriveKey(
      this.privateKey!, this.#channelKeys.publicSignKey, 'HMAC', false, ['sign', 'verify']
    )
  }

  /** @private */
  async #loadKeys(keyStrings: ChannelKeyStrings): Promise<void> {
    if (DBG) {
      console.log("loading keys:")
      console.log(keyStrings)
    }
    await this.#setKeys(await sbCrypto.channelKeyStringsToCryptoKeys(keyStrings))
  }

  @Memoize @Ready get keys() { return this.#channelKeys! }
  @Memoize @Ready get sbServer() { return this.#sbServer }
  @Memoize @Ready get readyFlag(): boolean { return this.#ChannelReadyFlag }
  @Memoize @Ready get api() { return this } // for compatibility
  @Memoize @Ready get channelId() { return this.#channelId }
  @Memoize @Ready get channelSignKey() { return (this.#channelSignKey!) }
  // @Memoize @Ready get capacity() { return this.#capacity }

  /**
   * Channel.getLastMessageTimes
   */
  getLastMessageTimes() {
    // xTODO: convert to new API call model
    return new Promise((resolve, reject) => {
      SBFetch(this.#channelApi + '/getLastMessageTimes', {
        method: 'POST', body: JSON.stringify([this.channelId])
      }).then((response: Response) => {
        if (!response.ok) {
          reject(new Error('Network response was not OK'));
        }
        return response.json();
      }).then((message_times) => {
        resolve(message_times[this.channelId!]);
      }).catch((e: Error) => {
        reject(e);
      });
    });
  }

  /**
   * Channel.getOldMessages
   * 
   * Will return most recent messages from the channel.
   * 
   * @param currentMessagesLength - number to fetch (default 100)
   * @param paginate - if true, will paginate from last request (default false)
   *
   */
  getOldMessages(currentMessagesLength: number = 100, paginate: boolean = false): Promise<Array<ChannelMessage>> {
    // xTODO: convert to new API call model
    return new Promise(async (resolve, reject) => {
      // make sure channel is ready
      if (!this.#ChannelReadyFlag) {
        if (DBG) console.log("Channel.getOldMessages: channel not ready (we will wait)")
        await (this.channelReady)
        if (!this.#channelKeys)
          reject("Channel.getOldMessages: no channel keys (?) despite waiting")
      }
      // TODO: we want to cache (merge) these messages into a local cached list (since they are immutable)
      let cursorOption = '';
      if (paginate)
        cursorOption = '&cursor=' + this.#cursor;
      SBFetch(this.#channelServer + this.channelId + '/oldMessages?currentMessagesLength=' + currentMessagesLength + cursorOption, {
        method: 'GET',
      }).then(async (response: Response) => {
        if (!response.ok) reject(new Error('Network response was not OK'));
        return response.json();
      }).then((messages) => {
        if (DBG) {
          console.log("getOldMessages")
          console.log(messages)
        }
        Promise.all(Object
          .keys(messages)
          .filter((v) => messages[v].hasOwnProperty('encrypted_contents'))
          .map((v) => deCryptChannelMessage(v, messages[v].encrypted_contents, this.#channelKeys!)))
          .then((unfilteredDecryptedMessageArray) => unfilteredDecryptedMessageArray.filter((v): v is ChannelMessage => Boolean(v)))
          .then((decryptedMessageArray) => {
            let lastMessage = decryptedMessageArray[decryptedMessageArray.length - 1];
            if (lastMessage)
              this.#cursor = lastMessage._id || lastMessage.id || '';
            if (DBG2) console.log(decryptedMessageArray)
            resolve(decryptedMessageArray)
          })
      }).catch((e: Error) => {
        reject(e);
      });
    });
  }

  async #callApi(path: string): Promise<any>
  async #callApi(path: string, body: any): Promise<any>
  async #callApi(path: string, body?: any): Promise<any> {
    if (DBG) console.log("#callApi:", path)
    if (!this.#ChannelReadyFlag) {
      console.log("ChannelApi.#callApi: channel not ready (we will wait)")
      await (this.channelReady)
    }
    const method = body ? 'POST' : 'GET'
    return new Promise(async (resolve, reject) => {
      await (this.ready)
      let authString = '';
      const token_data: string = new Date().getTime().toString()
      authString = token_data + '.' + await sbCrypto.sign(this.channelSignKey, token_data)
      let init: RequestInit = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'authorization': authString
        }
      }
      if (body)
        init.body = JSON.stringify(body);
      await (this.ready)
      SBFetch(this.#channelServer + this.channelId + path, init)
        .then(async (response: Response) => {
          const retValue = await response.json()
          if ((!response.ok) || (retValue.error)) {
            let apiErrorMsg = 'Network or Server error on Channel API call'
            if (response.status) apiErrorMsg += ' [' + response.status + ']'
            if (retValue.error) apiErrorMsg += ': ' + retValue.error
            reject(new Error(apiErrorMsg))
          } else {
            resolve(retValue)
          }
        })
        .catch((e: Error) => { reject("ChannelApi (SBFetch) Error [2]: " + WrapError(e)) })
    })
  }

  /**
   * Update (set) the capacity of the channel; Owner only
   */
  @Ready updateCapacity(capacity: number) { return this.#callApi('/updateRoomCapacity?capacity=' + capacity) }
  /**
   * getCapacity
   */
  @Ready getCapacity() { return (this.#callApi('/getRoomCapacity')) }
  /**
   * getStorageLimit (current storage budget)
   */
  @Ready getStorageLimit() { return (this.#callApi('/getStorageLimit')) }
  /**
   * getMother
   * 
   * Get the channelID from which this channel was budded. Note that
   * this is only accessible by Owner (as well as hosting server)
   */
  @Ready getMother() { return (this.#callApi('/getMother')) }
  /**
   * getJoinRequests
   */
  @Ready getJoinRequests() { return this.#callApi('/getJoinRequests') }
  /**
   * isLocked
   */
  @ExceptionReject isLocked() { return new Promise<boolean>((resolve) => (this.#callApi('/roomLocked')).then((d) => resolve(d.locked === true))) }
  /**
   * Set message of the day
   */
  @Ready setMOTD(motd: string) { return this.#callApi('/motd', { motd: motd }) }
  /**
   * Channel.getAdminData
   */
  @Ready getAdminData(): Promise<ChannelAdminData> { return this.#callApi('/getAdminData') }

  /**
   * Channel.downloadData
   */
  @Ready downloadData() {
    return new Promise((resolve, reject) => {
      this.#callApi('/downloadData')
        .then((data: Dictionary<any>) => {
          console.log("From downloadData:")
          console.log(data);
          Promise.all(Object
            .keys(data)
            .filter((v) => {
              const regex = new RegExp(this.channelId as string);
              if (v.match(regex)) {
                const message = jsonParseWrapper(data[v], "L3318")
                if (message.hasOwnProperty('encrypted_contents')) {
                  if (DBG) console.log("Received message: ", message)
                  return message;
                }
              }
            })
            .map((v) => {
              const message = jsonParseWrapper(data[v], "L3327")
              if (DBG2) console.log(v, message.encrypted_contents, this.keys)
              return deCryptChannelMessage(v, message.encrypted_contents, this.keys)
            }))
            .then((unfilteredDecryptedMessageArray) => unfilteredDecryptedMessageArray.filter((v): v is ChannelMessage => Boolean(v)))
            .then((decryptedMessageArray) => {
              let storage: any = {}
              decryptedMessageArray.forEach((message) => {
                if (!message.control && message.imageMetaData!.imageId) {
                  const f_control_msg = decryptedMessageArray.find((ctrl_msg) => ctrl_msg.id && ctrl_msg.id == message.imageMetaData!.imageId)
                  const p_control_msg = decryptedMessageArray.find((ctrl_msg) => ctrl_msg.id && ctrl_msg.id == message.imageMetaData!.previewId)
                  storage[`${message.imageMetaData!.imageId}.f`] = f_control_msg?.verificationToken
                  storage[`${message.imageMetaData!.previewId}.p`] = p_control_msg?.verificationToken
                }
              })
              resolve({ storage: storage, channel: data })
            })
        }).catch((error: Error) => {
          reject(error);
        });
    });
  }

  @Ready uploadChannel(channelData: ChannelData) {
    return this.#callApi('/uploadRoom', channelData)
  }

  @Ready authorize(ownerPublicKey: Dictionary<any>, serverSecret: string) {
    return this.#callApi('/authorizeRoom', { roomId: this.channelId, SERVER_SECRET: serverSecret, ownerKey: ownerPublicKey })
  }

  // deprecated - this is now implicitly done on first connect
  @Ready postPubKey(_exportable_pubKey: JsonWebKey): Promise<{ success: boolean }> {
    throw new Error("postPubKey() deprecated")
  }

  @Ready storageRequest(byteLength: number): Promise<Dictionary<any>> {
    return this.#callApi('/storageRequest?size=' + byteLength)
  }

  /**
   * Channel.lock()
   * 
   * Locks the channel, so that new visitors need an "ack" to join..
   * 
   */
  @Ready lock() {
    console.warn("WARNING: lock() on channel api has not been tested/debugged fully ..")
    return new Promise(async (resolve, reject) => {
      if (this.keys.lockedKey == null && this.admin) {
        const _locked_key: CryptoKey = await crypto.subtle.generateKey({
          name: 'AES-GCM', length: 256
        }, true, ['encrypt', 'decrypt']);
        const _exportable_locked_key: Dictionary<any> = await crypto.subtle.exportKey('jwk', _locked_key);
        this.#callApi('/lockRoom')
          .then((data: Dictionary<any>) => {
            if (data.locked) {
              this.acceptVisitor(JSON.stringify(this.exportable_pubKey!))
                .then(() => {
                  resolve({ locked: data.locked, lockedKey: _exportable_locked_key })
                })
            }
          })
          .catch((error: Error) => { reject(error) });
      } else {
        reject(new Error('no lock key or not admin'));
      }
    });
  }

  // TODO: test this guy, i doubt if it's working post-re-factor
  @Ready acceptVisitor(pubKey: string) {
    console.warn("WARNING: acceptVisitor() on channel api has not been tested/debugged fully ..")
    // todo: assert that you're owner
    return new Promise(async (resolve, reject) => {
      if (!this.privateKey /* this.keys.privateKey */)
        reject(new Error("acceptVisitor(): no private key"))
      const shared_key = await sbCrypto.deriveKey(
        this.privateKey /* this.keys.privateKey! */,
        await sbCrypto.importKey('jwk', jsonParseWrapper(pubKey, 'L2276'), 'ECDH', false, []), 'AES', false, ['encrypt', 'decrypt']
      );
      const _encrypted_locked_key = await sbCrypto.encrypt(sbCrypto.str2ab(JSON.stringify(this.keys.lockedKey!)), shared_key)
      resolve(this.#callApi('/acceptVisitor',
        {
          pubKey: pubKey, lockedKey: JSON.stringify(_encrypted_locked_key)
        }))
    });
  }

  // 2023.05.06:
  // In previous hosting strategy, the concept was that the host / SSO would
  // create and allocate a channel, but the SSO would keep track of owner key;
  // thus we needed a mechanism to rotate the owner key, should the user
  // wish to not have the SSO have access.  That way on a per-hosting service
  // basis, the provider could decide policy (eg an enterprise might disallow
  // owner key rotation).  In our new (2023) design, we have generalized channels
  // to be (much) more than a "room".  In the new design, channels are also
  // carriers of api and storage budget, and to control all the keys, a user
  // can "budd()" off a channel provided by server. Thus in the new design,
  // owner keys are NEVER rotated (other keys can be rotated). 
  @Ready ownerKeyRotation() {
    throw new Error("ownerKeyRotation() replaced by new budd() approach")
  }

  // ToDo: if both keys and storage are specified, should we check for server secret?

  /**
   * "budd" will spin a channel off an existing one.
   * You need to provide one of the following combinations of info:
   * 
   * - nothing: create new channel and transfer all storage budget
   * - just storage amount: creates new channel with that amount, returns new channel
   * - just a target channel: moves all storage budget to that channel
   * - just keys: creates new channel with those keys and transfers all storage budget
   * - keys and storage amount: creates new channel with those keys and that storage amount
   * 
   * In the first (special) case you can just call budd(), in the other
   * cases you need to fill out the 'options' object.
   * 
   * Another way to remember the above: all combinations are valid except
   * both a target channel and assigning keys.
   * 
   * Note: if you're specifying the target channel, then the return values will
   * not include the private key (that return value will be empty).
   * 
   * Same channels as mother and target will be a no-op, regardless of other
   * parameters.
   * 
   * Note: if you provide a value for 'storage', it cannot be undefined. If you
   * wish it to be Infinity, then you need to omit the property from options.
   * 
   * Future: negative amount of storage leaves that amount behind, the rest is transferred
   * 
   */
  budd(): Promise<SBChannelHandle> // clone and full plunder
  budd(options:
    {
      keys?: JsonWebKey;
      storage?: number;
      targetChannel?: SBChannelId;
    }): Promise<SBChannelHandle> // clone with specified keys, storage, and target channel
  @Ready budd(options?:
    {
      keys?: JsonWebKey;
      storage?: number;
      targetChannel?: SBChannelId;
    }): Promise<SBChannelHandle> {
    let { keys, storage, targetChannel } = options ?? {};
    return new Promise<SBChannelHandle>(async (resolve, reject) => {
      if ((options) && (options.hasOwnProperty('storage')) && (options.storage === undefined))
        // this catches the case where callee intended storage to have a value but somehow it didn't
        reject("If you omit 'storage' it defaults to Infinity, but you cannot set 'storage' to undefined")
      try {
        if (!storage) storage = Infinity;
        if (targetChannel) {
          // just a straight up transfer of budget
          if (this.#channelId == targetChannel) throw new Error("[budd()]: You can't specify the same channel as targetChannel")
          if (keys) throw new Error("[budd()]: You can't specify both a target channel and keys");
          resolve(this.#callApi(`/budd?targetChannel=${targetChannel}&transferBudget=${storage}`))
        } else {
          // we are creating a new channel
          const { channelData, exportable_privateKey } = await newChannelData(keys);
          let resp: Dictionary<any> = await this.#callApi(`/budd?targetChannel=${channelData.roomId}&transferBudget=${storage}`, channelData)
          if (resp.success) {
            resolve({ channelId: channelData.roomId!, key: exportable_privateKey })
          } else {
            reject(JSON.stringify(resp));
          }
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  // // currently not used by webclient, so these are not hooked up
  // notifications() { }
  // getPubKeys() { }
  // ownerUnread() { }
  // registerDevice() { }

} /* class ChannelAPI */
//#region - class ChannelAPI - TODO implement these methods

// catch and call out if this is missing
function noMessageHandler(_m: ChannelMessage): void { _sb_assert(false, "NO MESSAGE HANDLER"); }

/**
 * ChannelSocket
 */
export class ChannelSocket extends Channel {
  ready: Promise<ChannelSocket>
  channelSocketReady: Promise<ChannelSocket>
  #ChannelSocketReadyFlag: boolean = false // must be named <class>ReadyFlag

  #ws: WSProtocolOptions
  #sbServer: SBServer
  #onMessage = noMessageHandler // the user message handler
  #ack: Map<string, (value: string | PromiseLike<string>) => void> = new Map()
  #traceSocket: boolean = false // should not be true in production
  #resolveFirstMessage: (value: ChannelSocket | PromiseLike<ChannelSocket>) => void = () => { _sb_exception('L2461', 'this should never be called') }
  #firstMessageEventHandlerReference: (e: MessageEvent<any>) => void = (_e: MessageEvent<any>) => { _sb_exception('L2462', 'this should never be called') }

  /**
   * 
   * ChannelSocket constructor
   * 
   * This extends Channel. Use this instead of ChannelEndpoint if you
   * are going to be sending/receiving messages.
   * 
   * You send by calling channel.send(msg: SBMessage | string), i.e.
   * you can send a quick string.
   * 
   * You can set your message handler upon creation, or later by using
   * channel.onMessage = (m: ChannelMessage) => { ... }.
   * 
   * This implementation uses websockeds to connect all participating
   * clients through a single servlet (somewhere), with very fast
   * forwarding.
   * 
   * You don't need to worry about managing resources, like closing it,
   * or checking if it's open. It will close based on server behavior,
   * eg it's up to the server to close the connection based on inactivity.
   * The ChannelSocket will re-open if you try to send against a closed
   * connection. You can check status with channelSocket.status if you
   * like, but it shouldn't be necessary.
   * 
   * Messages are delivered as type ChannelMessage. Usually they are
   * simple blobs of data that are encrypted: the ChannelSocket will
   * decrypt them for you. It also handles a simple ack/nack mechanism
   * with the server transparently.
   * 
   * Be aware that if ChannelSocket doesn't know how to handle a certain
   * message, it will generally just forward it to you as-is. 
   * 
   * @param sbServer 
   * @param onMessage 
   * @param key 
   * @param channelId 
   */
  constructor(sbServer: SBServer, onMessage: (m: ChannelMessage) => void, key?: JsonWebKey, channelId?: string) {
    super(sbServer, key, channelId /*, identity ? identity : new Identity() */) // initialize 'channel' parent
    _sb_assert(sbServer.channel_ws, 'ChannelSocket(): no websocket server name provided')
    _sb_assert(onMessage, 'ChannelSocket(): no onMessage handler provided')
    const url = sbServer.channel_ws + '/api/room/' + channelId + '/websocket'
    this.#onMessage = onMessage
    this.#sbServer = sbServer
    this.#ws = {
      url: url,
      // websocket: new WebSocket(url),
      ready: false,
      closed: false,
      timeout: 2000
    }
    this.ready = this.channelSocketReady = this.#channelSocketReadyFactory()
  }

  #channelSocketReadyFactory() {
    if (DBG) console.log("++++ CREATING ChannelSocket.readyPromise()")
    return new Promise<ChannelSocket>((resolve, reject) => {
      if (DBG) console.log("++++ STARTED ChannelSocket.readyPromise()")
      this.#resolveFirstMessage = resolve
      const url = this.#ws.url
      if (DBG) { console.log("++++++++ readyPromise() has url:"); console.log(url); }
      if (!this.#ws.websocket) this.#ws.websocket = new WebSocket(this.#ws.url)
      if (this.#ws.websocket.readyState === 3) {
        // it's been closed
        this.#ws.websocket = new WebSocket(url)
      } else if (this.#ws.websocket.readyState === 2) {
        console.warn("STRANGE - trying to use a ChannelSocket that is in the process of closing ...")
        this.#ws.websocket = new WebSocket(url)
      }
      this.#ws.websocket.addEventListener('open', () => {
        this.#ws.closed = false
        // need to make sure parent is ready (and has keys)
        this.channelReady.then(() => {
          _sb_assert(this.exportable_pubKey, "ChannelSocket.readyPromise(): no exportable pub key?")
          this.#ws.init = { name: JSON.stringify(this.exportable_pubKey) }
          if (DBG) { console.log("++++++++ readyPromise() constructed init:"); console.log(this.#ws.init); }
          this.#ws.websocket!.send(JSON.stringify(this.#ws.init)) // this should trigger a response with keys
        })
      })
      this.#firstMessageEventHandlerReference = this.#firstMessageEventHandler.bind(this)
      this.#ws.websocket.addEventListener('message', this.#firstMessageEventHandlerReference);
      this.#ws.websocket.addEventListener('close', (e: CloseEvent) => {
        this.#ws.closed = true
        if (!e.wasClean) {
          console.log(`ChannelSocket() was closed (and NOT cleanly: ${e.reason} from ${this.#sbServer.channel_server}`)
        } else {
          if (e.reason.includes("does not have an owner"))
            reject(`No such channel on this server (${this.#sbServer.channel_server})`)
          else console.log('ChannelSocket() was closed (cleanly): ', e.reason)
        }
        reject('wbSocket() closed before it was opened (?)')
      })
      this.#ws.websocket.addEventListener('error', (e) => {
        this.#ws.closed = true
        console.log('ChannelSocket() error: ', e)
        reject('ChannelSocket creation error (see log)')
      })
      // let us set a timeout to catch and make sure this thing resoles within 0.5 seconds
      // todo: add as a decorator for ready-template style constructors
      setTimeout(() => {
        if (!this.#ChannelSocketReadyFlag) {
          console.warn("ChannelSocket() - this socket is not resolving (waited 10s) ...")
          console.log(this)
          reject('ChannelSocket() - this socket is not resolving (waited 10s) ...')
        } else {
          if (DBG) {
            console.log("ChannelSocket() - this socket resolved")
            console.log(this)
          }
        }
      }, 10000)
    })

  }

  /** @private */
  async #processMessage(msg: any) {
    let m = msg.data
    if (this.#traceSocket) {
      console.log("... raw unwrapped message:")
      console.log(structuredClone(m))
    }
    const data = jsonParseWrapper(m, 'L1489')
    if (this.#traceSocket) {
      console.log("... json unwrapped version of raw message:")
      console.log(Object.assign({}, data))
    }
    if (typeof this.#onMessage !== 'function')
      _sb_exception('ChannelSocket', 'received message but there is no handler')

    const message = data as ChannelMessage
    try {
      // messages are structured a bit funky for historical reasons
      const m01 = Object.entries(message)[0][1]

      if (Object.keys(m01)[0] === 'encrypted_contents') {
        if (DBG) { 
          console.log("++++++++ #processMessage: received message:")
          console.log(m01.encrypted_contents.content)
        }

        // check if this message is one that we've recently sent
        const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(m01.encrypted_contents.content))
        const ack_id = arrayBufferToBase64(hash)
        if (DBG2) console.log("Received message with hash:", ack_id)
        const r = this.#ack.get(ack_id)
        if (r) {
          if (this.#traceSocket) console.log(`++++++++ #processMessage: found matching ack for id ${ack_id}`)
          this.#ack.delete(ack_id)
          r("success") // we first resolve that outstanding send (and then also deliver message)
        }

        const m00 = Object.entries(data)[0][0]
        // the 'iv' field as incoming should be base64 encoded, with 16 b64
        // characters translating here to 12 bytes
        const iv_b64 = m01.encrypted_contents.iv
        // open question: if there are any issues decrypting, should we forward as-is?
        if ((iv_b64) && (_assertBase64(iv_b64)) && (iv_b64.length == 16)) {
          m01.encrypted_contents.iv = base64ToArrayBuffer(iv_b64)
          try {
            const m = await deCryptChannelMessage(m00, m01.encrypted_contents, this.keys)
            if (!m)
              return // skip if there's an issue
            if (this.#traceSocket) {
              console.log("++++++++ #processMessage: passing to message handler:")
              console.log(Object.assign({}, m))
            }
            // we process 'whispers' here, they're 1-1 messages, and can be skipped if not for us


            this.#onMessage(m)
          } catch {
            console.warn('Error decrypting message, dropping (ignoring) message')
          }
        } else {
          console.error('#processMessage: - iv is malformed, should be 16-char b64 string (ignoring)')
        }
      } else {
        // other (future) message types would be parsed here
        console.warn("++++++++ #processMessage: can't decipher message, passing along unchanged:")
        console.log(Object.assign({}, message))
        this.onMessage(message)
      }
    } catch (e) {
      console.log(`++++++++ #processMessage: caught exception while decyphering (${e}), passing it along unchanged`)
      this.onMessage(message)
      // console.error(`#processmessage: cannot handle locked channels yet (${e})`)
      // TODO: locked key might never resolve (if we don't have it)
      // TODO: ... generally speaking need to test/fix locked channels
      // unwrapped = await sbCrypto.unwrap(this.keys.lockedKey, message.encrypted_contents, 'string')
    }
  }

  #insideFirstMessageHandler(e: MessageEvent) {
    console.warn("WARNING: firstMessageEventHandler() called recursively (?)")
    console.warn(e)
  }

  // we use (bound) message handlers orchestrate who handles first message (and only once)
  #firstMessageEventHandler(e: MessageEvent) {
    console.log("FIRST MESSAGE HANDLER CALLED")
    const blocker = this.#insideFirstMessageHandler.bind(this)
    this.#ws.websocket!.addEventListener('message', blocker)
    this.#ws.websocket!.removeEventListener('message', this.#firstMessageEventHandlerReference)
    // first time should be a handshake of keys, they should match what we have;
    // there may be other information in the message (eg motd, roomLocked)
    if (DBG) { console.log("++++++++ readyPromise() received ChannelKeysMessage:"); console.log(e); }
    const message = jsonParseWrapper(e.data, 'L2239') as ChannelKeysMessage
    if (DBG) console.log(message)
    _sb_assert(message.ready, 'got roomKeys but channel reports it is not ready (?)')
    this.motd = message.motd
    this.locked = message.roomLocked
    const exportable_owner_pubKey = jsonParseWrapper(message.keys.ownerKey, 'L2246')
    // just small sanity check on owner key (x marks the spot)
    _sb_assert(this.keys.ownerPubKeyX === exportable_owner_pubKey.x, 'ChannelSocket.readyPromise(): owner key mismatch??')
    _sb_assert(this.readyFlag, '#ChannelReadyFlag is false, parent not ready (?)')
    // this sets us as owner only if the keys match

    this.owner = sbCrypto.compareKeys(exportable_owner_pubKey, this.exportable_pubKey!)
    // TODO: we have mostly lost the "admin" concept (need adminData?)
    // this.adminData = await this.api.getAdminData()
    // @psm: we want to reserve 'admin' for future SSO use
    // this.admin = this.owner
    this.admin = false
    // once we've gotten our keys, we substitute the main message handler
    this.#ws.websocket!.addEventListener('message', this.#processMessage.bind(this))
    this.#ws.websocket!.removeEventListener('message', blocker)
    if (DBG) console.log("++++++++ readyPromise() all done - resolving!")
    this.#ChannelSocketReadyFlag = true
    this.#resolveFirstMessage(this)
  }

  get status() {
    if (!this.#ws.websocket) return 'CLOSED'
    else switch (this.#ws.websocket.readyState) {
      case 0: return 'CONNECTING'
      case 1: return 'OPEN'
      case 2: return 'CLOSING'
      default: return 'CLOSED'
    }
  }

  set onMessage(f: (m: ChannelMessage) => void) { this.#onMessage = f }
  @Ready get onMessage() { return this.#onMessage }

  /** Enables debug output */
  set enableTrace(b: boolean) {
    this.#traceSocket = b;
    console.log(`==== jslib ChannelSocket: Tracing ${b ? 'en' : 'dis'}abled ====`);
  }

  /**
    * ChannelSocket.send()
    *
    * Returns a promise that resolves to "success" when sent,
    * or an error message if it fails.
    */
  @VerifyParameters
  send(msg: SBMessage | string): Promise<string> {
    let message: SBMessage = typeof msg === 'string' ? new SBMessage(this, msg) : msg
    _sb_assert(this.#ws.websocket, "ChannelSocket.send() called before ready")
    if (this.#ws.closed) {
      if (this.#traceSocket) console.info("send() triggered reset of #readyPromise() (normal)")
      this.ready = this.channelSocketReady = this.#channelSocketReadyFactory()
      this.#ChannelSocketReadyFlag = true
    }
    return new Promise((resolve, reject) => {
      message.ready.then((message) => { // message needs to be ready
        this.ready.then(() => { // so does channel socket
          if (!this.#ChannelSocketReadyFlag) reject("ChannelSocket.send() is confused - ready or not?")
          switch (this.#ws.websocket!.readyState) {
            case 1: // OPEN
              if (this.#traceSocket) {
                console.log("Wrapping message contents:")
                console.log(Object.assign({}, message.contents))
              }
              sbCrypto.wrap(message.encryptionKey!, JSON.stringify(message.contents), 'string')
                .then((wrappedMessage) => {
                  const m = JSON.stringify({
                    encrypted_contents: wrappedMessage,
                    recipient: message.sendToPubKey ? message.sendToPubKey : undefined
                  })
                  console.log("++++++++ ChannelSocket.send(): sending message:")
                  console.log(wrappedMessage.content as string)
                  crypto.subtle.digest('SHA-256', new TextEncoder().encode(wrappedMessage.content as string))
                    .then((hash) => {
                      const messageHash = arrayBufferToBase64(hash)
                      if (DBG) {
                        console.log("Which has hash:")
                        console.log(messageHash)
                      }
                      // const ackPayload = { timestamp: Date.now(), type: 'ack', _id: _id }
                      this.#ack.set(messageHash, resolve)
                      this.#ws.websocket!.send(m)
                      // TODO: not sure why we needed separate 'ack' interaction, just resolve on seeing message back?
                      // this.#ws.websocket!.send(JSON.stringify(ackPayload));
                      setTimeout(() => {
                        if (this.#ack.has(messageHash)) {
                          this.#ack.delete(messageHash)
                          const msg = `Websocket request timed out (no ack) after ${this.#ws.timeout}ms (${messageHash})`
                          console.error(msg)
                          reject(msg)
                        } else {
                          // normal behavior
                          if (this.#traceSocket) console.log("++++++++ ChannelSocket.send() completed sending")
                          resolve("success")
                        }
                      }, this.#ws.timeout)
                    })
                })
              break
            case 3: // CLOSED
            case 0: // CONNECTING
            case 2: // CLOSING
              const errMsg = 'socket not OPEN - either CLOSED or in the state of CONNECTING/CLOSING'
              // _sb_exception('ChannelSocket', errMsg)
              reject(errMsg)
          }
        })
      })
    })
  }

  /** @type {JsonWebKey} */ @Memoize @Ready get exportable_owner_pubKey() { return this.keys.ownerKey }

} /* class ChannelSocket */


//# region - classes ChannelEndpoint
/**
 *
 * ChannelEndpoint
 *
 * Gives access to a Channel API (without needing to connect to socket).
 * It's fully functional except it won't send or receive messages
 * (obviously, that's what a socket is for, but we might add send/receive
 * in the future for non-socket use cases)
 */
export class ChannelEndpoint extends Channel {
  constructor(sbServer: SBServer, key?: JsonWebKey, channelId?: string) {
    super(sbServer, key, channelId)
  }

  send(_m: SBMessage | string, _messageType?: 'string' | 'SBMessage'): Promise<string> {
    return new Promise<string>((_resolve, reject) => {
      reject('ChannelEndpoint.send(): send outside ChannelSocket not yet implemented')
    })
  }

  set onMessage(_f: CallableFunction) {
    _sb_assert(false, "ChannelEndpoint.onMessage: send/receive outside ChannelSocket not yet implemented")
  }
}
//#endregion - classes ChannelEndpoint


async function deCryptChannelMessage(m00: string, m01: EncryptedContents, keys: ChannelKeys) {
  const z = messageIdRegex.exec(m00)
  let encryptionKey = keys.encryptionKey // default
  if (z) {
    let m: ChannelEncryptedMessage = {
      type: 'encrypted',
      channelID: z[1],
      timestampPrefix: z[2],
      _id: z[1] + z[2],
      encrypted_contents: encryptedContentsMakeBinary(m01)
    }
    const unwrapped = await sbCrypto.unwrap(encryptionKey, m.encrypted_contents!, 'string')
    let m2: ChannelMessage = { ...m, ...jsonParseWrapper(unwrapped, 'L1977') };
    if (m2.contents) {
      m2.text = m2.contents
      // if(!m2?.contents?.hasOwnProperty('isVerfied')){
      //   m2.contents!.isVerified
      // }
    }
    m2.user = {
      name: m2.sender_username ? m2.sender_username : 'Unknown',
      _id: m2.sender_pubKey
    }

    if ((m2.verificationToken) && (!m2.sender_pubKey)) {
      console.error('ERROR: message with verification token is lacking sender identity (cannot be verified).')
      return (undefined)
    }

    // todo: we could speed this up by caching imported keys from known senders
    const senderPubKey = await sbCrypto.importKey('jwk', m2.sender_pubKey!, 'ECDH', true, [])
    const verifyKey = await sbCrypto.deriveKey(keys.signKey, senderPubKey, 'HMAC', false, ['sign', 'verify'])
    const v = await sbCrypto.verify(verifyKey, m2.sign!, m2.contents!)

    if (!v) {
      console.error("***** signature is NOT correct for message (rejecting)")
      console.log("verifyKey:")
      console.log(Object.assign({}, verifyKey))
      console.log("m2.sign")
      console.log(Object.assign({}, m2.sign))
      console.log("m2.contents")
      console.log(structuredClone(m2.contents))
      console.log("Message:")
      console.log(Object.assign({}, m2))
      console.trace()
      return (undefined)
    }

    // if it's a whisper, we unwrap from text to whisper
    if (m2.whispered === true) {
      // TODO TODO: add the whisper 

    }

    return (m2)
  } else {
    console.log("++++++++ #processMessage: ERROR - cannot parse channel ID / timestamp, invalid message")
    console.log(Object.assign({}, m00))
    console.log(Object.assign({}, m01))
    return (undefined)
  }
} // deCryptChannelMessage()

/**
 * Basic object handle for a shard (all storage).
 * 
 * To RETRIEVE a shard, you need id and verification.
 * 
 * To DECRYPT a shard, you need key, iv, and salt. Current
 * generation of shard servers will provide (iv, salt) upon
 * request if (and only if) you have id and verification.
 * 
 * Note that id32/key32 are array32 encoded (a32). (Both 
 * id and key are 256-bit entities).
 * 
 * 'verification' is a 64-bit integer, encoded as a string
 * of up 23 characters: it is four 16-bit integers, either
 * joined by '.' or simply concatenated. Currently all four
 * values are random, future generation only first three
 * are guaranteed to be random, the fourth may be "designed".
 * 
 * 
 * @typedef {Object} SBObjectHandleClass
 * @property {boolean} [SB_OBJECT_HANDLE_SYMBOL] - flag to indicate this is an SBObjectHandle
 * @property {string} version - version of this object
 * @property {SBObjectType} type - type of object
 * @property {string} id - id of object
 * @property {string} key - key of object
 * @property {Base62Encoded} [id32] - optional: array32 format of id
 * @property {Base62Encoded} [key32] - optional: array32 format of key
 * @property {Promise<string>|string} verification - and currently you also need to keep track of this,
 * but you can start sharing / communicating the
 * object before it's resolved: among other things it
 * serves as a 'write-through' verification
 * @property {Uint8Array|string} [iv] - you'll need these in case you want to track an object
 * across future (storage) servers, but as long as you
 * are within the same SB servers you can request them.
 * @property {Uint8Array|string} [salt] - you'll need these in case you want to track an object
 * across future (storage) servers, but as long as you
 * are within the same SB servers you can request them.
 * @property {string} [fileName] - by convention will be "PAYLOAD" if it's a set of objects
 * @property {string} [dateAndTime] - optional: time of shard creation
 * @property {string} [shardServer] - optionally direct a shard to a specific server (especially for reads)
 * @property {string} [fileType] - optional: file type (mime)
 * @property {number} [lastModified] - optional: last modified time (of underlying file, if any)
 * @property {number} [actualSize] - optional: actual size of underlying file, if any
 * @property {number} [savedSize] - optional: size of shard (may be different from actualSize)
 * 
 */
export class SBObjectHandle implements SBObjectHandle {
  version?= '1';
  #_type: SBObjectType = 'b';
  #id?: string;
  #key?: string;
  #id32?: Base62Encoded | undefined;
  #key32?: Base62Encoded | undefined;
  #verification?: Promise<string> | string;
  iv?: Uint8Array | string;
  salt?: Uint8Array | string;
  fileName?: string;
  dateAndTime?: string;
  shardServer?: string;
  fileType?: string;
  lastModified?: number;
  actualSize?: number;
  savedSize?: number;

  constructor(options: SBObjectHandle) {
    const {
      version, type, id, key, id32, key32, verification, iv, salt, fileName, dateAndTime,
      shardServer, fileType, lastModified, actualSize, savedSize,
    } = options;

    if (type) this.#_type = type
    if (version) this.version = version

    if (id) this.id = id;
    if (key) this.key = key;
    if (id32) this.id32 = id32
    if (key32) this.key32 = key32
    if (verification) this.#verification = verification;

    this.iv = iv;
    this.salt = salt;
    this.fileName = fileName;
    this.dateAndTime = dateAndTime;
    this.shardServer = shardServer;
    this.fileType = fileType;
    this.lastModified = lastModified;
    this.actualSize = actualSize;
    this.savedSize = savedSize;

  }

  // // ToDo: this is no longer the future mechanism, we will use "synonyms"
  // // create id32 - if (and when) we have enough info
  // #setId32() {
  //   if (this.#id) {
  //     const bindID = this.#id;
  //     async () => {
  //       const verification = await Promise.resolve(this.verification);
  //       const fullID = this.#id + verification.split('.').join(''); // backwards compatible
  //       crypto.subtle.digest('SHA-256', new TextEncoder().encode(fullID)).then((hash) => {
  //         if (bindID !== this.#id) return; // if id has changed, don't set
  //         this.#id32 = arrayBuffer32ToBase62(hash);
  //       });
  //     }
  //   }
  // }

  set id(value: string) { _assertBase64(value); this.#id = value; this.#id32 = base64ToBase62(value); }
  get id(): string { _sb_assert(this.#id, 'object handle identifier is undefined'); return this.#id!; }

  set key(value: string) { _assertBase64(value); this.#key = value; this.#key32 = base64ToBase62(value); }
  get key(): string { _sb_assert(this.#key, 'object handle identifier is undefined'); return this.#key!; }

  set id32(value: Base62Encoded) {
    if (!isBase62Encoded(value)) throw new Error('Invalid base62 encoded ID');
    this.#id32 = value;
    this.#id = base62ToBase64(value);
  }

  set key32(value: Base62Encoded) {
    if (!isBase62Encoded(value)) throw new Error('Invalid base62 encoded Key');
    this.#key32 = value;
    this.#key = base62ToBase64(value);
  }

  get id32(): Base62Encoded { _sb_assert(this.#id32, 'object handle id (32) is undefined'); return this.#id32!; }
  get key32(): Base62Encoded { _sb_assert(this.#key32, 'object handle key (32) is undefined'); return this.#key32!; }

  set verification(value: Promise<string> | string) { this.#verification = value; /* this.#setId32(); */ }
  get verification(): Promise<string> | string {
    _sb_assert(this.#verification, 'object handle verification is undefined');
    return this.#verification!;
  }

  get type(): SBObjectType { return this.#_type; }

}

/**
 * Storage API
 * @class
 * @constructor
 * @public
 */
class StorageApi {
  server: string;
  shardServer?: string;
  channelServer: string; // approves budget, TODO this needs some thought

  constructor(server: string, channelServer: string, shardServer?: string) {
    this.server = server + '/api/v1';
    this.channelServer = channelServer + '/api/room/'
    if (shardServer)
      this.shardServer = shardServer + '/api/v1'
    // else
    //  this.shardServer = 'https://shard.3.8.4.land/api/v1'
  }

  /**
   * Pads object up to closest permitted size boundaries;
   * currently that means a minimum of 4KB and a maximum of
   * of 1 MB, after which it rounds up to closest MB.
   *
   * @param buf blob of data to be eventually stored
   */
  /** @private */
  #padBuf(buf: ArrayBuffer) {
    const image_size = buf.byteLength; let _target
    // pick the size to be rounding up to
    if ((image_size + 4) < 4096) _target = 4096 // smallest size
    else if ((image_size + 4) < 1048576) _target = 2 ** Math.ceil(Math.log2(image_size + 4)) // in between
    else _target = (Math.ceil((image_size + 4) / 1048576)) * 1048576 // largest size
    // append the padding buffer
    let finalArray = _appendBuffer(buf, (new Uint8Array(_target - image_size)).buffer);
    // set the (original) size in the last 4 bytes
    (new DataView(finalArray)).setUint32(_target - 4, image_size)
    if (DBG2) {
      console.log("#padBuf bytes:");
      console.log(finalArray.slice(-4))
    }
    return finalArray
  }

  /**
   * The actual size of the object is encoded in the
   * last 4 bytes of the buffer. This function removes
   * all the padding and returns the actual object.
   */
  /** @private */
  #unpadData(data_buffer: ArrayBuffer): ArrayBuffer {
    const tail = data_buffer.slice(-4)
    var _size = new DataView(tail).getUint32(0)
    const _little_endian = new DataView(tail).getUint32(0, true)
    if (_little_endian < _size) {
      if (DBG2) console.warn("#unpadData - size of shard encoded as little endian (fixed upon read)")
      _size = _little_endian
    }
    if (DBG2) {
      console.log(`#unpadData - size of object is ${_size}`)
      // console.log(tail)
    }
    return data_buffer.slice(0, _size);
  }

  /** @private */
  #getObjectKey(fileHash: string, _salt: ArrayBuffer): Promise<CryptoKey> {
    return new Promise((resolve, reject) => {
      try {
        sbCrypto.importKey('raw', base64ToArrayBuffer(decodeURIComponent(fileHash)),
          'PBKDF2', false, ['deriveBits', 'deriveKey']).then((keyMaterial) => {
            // @psm TODO - Support deriving from PBKDF2 in sbCrypto.eriveKey function
            crypto.subtle.deriveKey({
              'name': 'PBKDF2', // salt: crypto.getRandomValues(new Uint8Array(16)),
              'salt': _salt,
              'iterations': 100000, // small is fine, we want it snappy
              'hash': 'SHA-256'
            }, keyMaterial, { 'name': 'AES-GCM', 'length': 256 }, true, ['encrypt', 'decrypt']).then((key) => {
              // console.log(key)
              resolve(key)
            })
          })
      } catch (e) {
        reject(e);
      }
    });
  }

  /** @private */
  #_allocateObject(image_id: string, type: SBObjectType): Promise<{ salt: Uint8Array, iv: Uint8Array }> {
    return new Promise((resolve, reject) => {
      SBFetch(this.server + "/storeRequest?name=" + image_id + "&type=" + type)
        .then((r) => { /* console.log('got storage reply:'); console.log(r); */ return r.arrayBuffer(); })
        .then((b) => {
          const par = extractPayload(b)
          resolve({ salt: new Uint8Array(par.salt), iv: new Uint8Array(par.iv) })
        })
        .catch((e) => {
          console.warn(`**** ERROR: ${e}`)
          reject(e)
        })
    })
  }

  /** @private */
  #_storeObject(
    image: ArrayBuffer,
    image_id: string,
    keyData: string,
    type: SBObjectType,
    roomId: SBChannelId,
    iv: Uint8Array,
    salt: Uint8Array
  ): Promise<string> {
    // export async function storeImage(image, image_id, keyData, type, roomId)
    return new Promise((resolve, reject) => {
      this.#getObjectKey(keyData, salt).then((key) => {
        sbCrypto.encrypt(image, key, iv, 'arrayBuffer').then((data) => {
          // const storageTokenReq = await(await
          SBFetch(this.channelServer + roomId + '/storageRequest?size=' + data.byteLength)
            .then((r) => r.json())
            .then((storageTokenReq) => {
              if (storageTokenReq.hasOwnProperty('error')) reject(`storage token request error (${storageTokenReq.error})`)
              let storageToken = JSON.stringify(storageTokenReq)
              this.storeData(type, image_id, iv, salt, storageToken, data)
                .then((resp_json) => {
                  if (resp_json.error) reject(`storeObject() failed: ${resp_json.error}`)
                  if (resp_json.image_id != image_id) reject(`received imageId ${resp_json.image_id} but expected ${image_id}`)
                  resolve(resp_json.verification_token)
                })
                .catch((e: any) => {
                  console.log("ERROR in _storeObject(): ${e}")
                  reject(e)
                })
            })
        })
      })
    })
  }

  /**
   *
   * @param buf
   * @param type
   * @param roomId
   *
   */
  getObjectMetadata(buf: ArrayBuffer, type: SBObjectType): Promise<SBObjectMetadata> {
    // export async function saveImage(sbImage, roomId, sendSystemMessage)
    return new Promise((resolve, reject) => {
      const paddedBuf = this.#padBuf(buf)
      sbCrypto.generateIdKey(paddedBuf).then((fullHash: { id: string, key: string }) => {
        // return { full: { id: fullHash.id, key: fullHash.key }, preview: { id: previewHash.id, key: previewHash.key } }
        this.#_allocateObject(fullHash.id, type)
          .then((p) => {
            const r: SBObjectMetadata = {
              [SB_OBJECT_HANDLE_SYMBOL]: true,
              version: '1',
              type: type,
              id: fullHash.id,
              key: fullHash.key,
              iv: p.iv,
              salt: p.salt,
              paddedBuffer: paddedBuf
            }
            resolve(r)
          })
          .catch((e) => reject(e))
      })
    })
  }

  /**
   * StorageApi.storeObject
   * @param buf
   * @param type
   * @param roomId
   *
   */
  storeObject(buf: BodyInit | Uint8Array, type: SBObjectType, roomId: SBChannelId, metadata?: SBObjectMetadata): Promise<Interfaces.SBObjectHandle> {
    // export async function saveImage(sbImage, roomId, sendSystemMessage)
    return new Promise((resolve, reject) => {
      if (buf instanceof Uint8Array) {
        if (DBG2) console.log('converting Uint8Array to ArrayBuffer')
        buf = new Uint8Array(buf).buffer
      }
      if (!(buf instanceof ArrayBuffer) && buf.constructor.name != 'ArrayBuffer') {
        if (DBG2) console.log('buf must be an ArrayBuffer:'); console.log(buf);
        reject('buf must be an ArrayBuffer')
      }
      const bufSize = (buf as ArrayBuffer).byteLength
      if (!metadata) {
        const paddedBuf = this.#padBuf(buf as ArrayBuffer)
        sbCrypto.generateIdKey(paddedBuf).then((fullHash: { id: string, key: string }) => {
          // return { full: { id: fullHash.id, key: fullHash.key }, preview: { id: previewHash.id, key: previewHash.key } }
          this.#_allocateObject(fullHash.id, type)
            .then((p) => {
              // storage server returns the salt and nonce it wants us to use
              const r: Interfaces.SBObjectHandle = {
                [SB_OBJECT_HANDLE_SYMBOL]: true,
                version: '1',
                type: type,
                id: fullHash.id,
                key: fullHash.key,
                id32: base64ToBase62(fullHash.id),
                key32: base64ToBase62(fullHash.key),
                iv: p.iv,
                salt: p.salt,
                actualSize: bufSize,
                verification: this.#_storeObject(paddedBuf, fullHash.id, fullHash.key, type, roomId, p.iv, p.salt)
              }
              resolve(r)
            })
            .catch((e) => reject(e))
        })
      } else {
        const r: Interfaces.SBObjectHandle = {
          [SB_OBJECT_HANDLE_SYMBOL]: true,
          version: '1',
          type: type,
          id: metadata.id,
          key: metadata.key,
          iv: metadata.iv,
          salt: metadata.salt,
          actualSize: bufSize,
          verification: this.#_storeObject(metadata.paddedBuffer, metadata.id, metadata.key, type, roomId, metadata.iv, metadata.salt)
        }
        resolve(r)
      }

    })
  }

  /**
   * StorageApi().storeRequest
   */
  storeRequest(fileId: string): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      SBFetch(this.server + '/storeRequest?name=' + fileId)
        .then((response: Response) => {
          if (!response.ok) { reject(new Error('Network response was not OK')) }
          return response.arrayBuffer()
        })
        .then((data: ArrayBuffer) => {
          resolve(data);
        }).catch((error: Error) => {
          reject(error);
        });
    });
  }

  /**
   * StorageApi().storeData()
   */
  storeData(type: string, fileId: string, iv: Uint8Array, salt: Uint8Array, storageToken: string, data: ArrayBuffer): Promise<Dictionary<any>> {
    // async function uploadImage(storageToken, encrypt_data, type, image_id, data)
    return new Promise((resolve, reject) => {
      SBFetch(this.server + '/storeData?type=' + type + '&key=' + ensureSafe(fileId), {
        // psm: need to clean up these types
        method: 'POST',
        body: assemblePayload({
          iv: iv,
          salt: salt,
          image: data,
          storageToken: (new TextEncoder()).encode(storageToken),
          vid: crypto.getRandomValues(new Uint8Array(48))
        })
      })
        .then((response: Response) => {
          if (!response.ok) { reject('response from storage server was not OK') }
          return response.json()
        })
        .then((data) => {
          resolve(data)
        }).catch((error: Error) => {
          reject(error)
        });
    });
  }

  /** @private */
  #processData(payload: ArrayBuffer, h: Interfaces.SBObjectHandle): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      try {
        let j = jsonParseWrapper(sbCrypto.ab2str(new Uint8Array(payload)), 'L3062')
        // normal operation is to break on the JSON.parse() and continue to finally clause
        if (j.error) reject(`#processData() error: ${j.error}`)
      } catch (e) {
        // do nothing - this is expected
      } finally {
        const data = extractPayload(payload)
        if (DBG) {
          console.log("Payload (#processData) is:")
          console.log(data)
        }
        // payload includes nonce and salt
        const iv = new Uint8Array(data.iv)
        const salt = new Uint8Array(data.salt)
        // we accept b64 versions
        const handleIV: Uint8Array | undefined = (!h.iv) ? undefined : (typeof h.iv === 'string') ? base64ToArrayBuffer(h.iv) : h.iv
        const handleSalt: Uint8Array | undefined = (!h.salt) ? undefined : (typeof h.salt === 'string') ? base64ToArrayBuffer(h.salt) : h.salt

        if ((handleIV) && (!compareBuffers(iv, handleIV))) {
          console.error("WARNING: nonce from server differs from local copy")
          console.log(`object ID: ${h.id}`)
          console.log(` local iv: ${arrayBufferToBase64(handleIV)}`)
          console.log(`server iv: ${arrayBufferToBase64(data.iv)}`)
        }
        if ((handleSalt) && (!compareBuffers(salt, handleSalt))) {
          console.error("WARNING: salt from server differs from local copy (will use server)")
          if (!h.salt) {
            console.log("h.salt is undefined")
          } else if (typeof h.salt === 'string') {
            console.log("h.salt is in string form (unprocessed):")
            console.log(h.salt)
          } else {
            console.log("h.salt is in arrayBuffer or Uint8Array")
            console.log("h.salt as b64:")
            console.log(arrayBufferToBase64(h.salt))
            console.log("h.salt unprocessed:")
            console.log(h.salt)
          }
          console.log("handleSalt as b64:")
          console.log(arrayBufferToBase64(handleSalt))
          console.log("handleSalt unprocessed:")
          console.log(handleSalt)
        }
        if (DBG2) {
          console.log("will use nonce and salt of:")
          console.log(`iv: ${arrayBufferToBase64(iv)}`)
          console.log(`salt : ${arrayBufferToBase64(salt)}`)
        }
        // const image_key: CryptoKey = await this.#getObjectKey(imageMetaData!.previewKey!, salt)
        this.#getObjectKey(h.key, salt).then((image_key) => {
          // TODO: test this, it used to call ab2str()? how could that work?
          // const encrypted_image = sbCrypto.ab2str(new Uint8Array(data.image))
          // const encrypted_image = new Uint8Array(data.image)
          const encrypted_image = data.image;
          if (DBG2) {
            console.log("data.image:      "); console.log(data.image)
            console.log("encrypted_image: "); console.log(encrypted_image)
          }
          // const padded_img: ArrayBuffer = await sbCrypto.unwrap(image_key, { content: encrypted_image, iv: iv }, 'arrayBuffer')
          sbCrypto.unwrap(image_key, { content: encrypted_image, iv: iv }, 'arrayBuffer').then((padded_img: ArrayBuffer) => {
            const img: ArrayBuffer = this.#unpadData(padded_img)
            // psm: issues should throw i think
            // if (img.error) {
            //   console.error('(Image error: ' + img.error + ')');
            //   throw new Error('Failed to fetch data - authentication or formatting error');
            // }
            if (DBG) { console.log("#processData(), unwrapped img: "); console.log(img) }
            resolve(img)
          })
        })
      }
    })
  }

  /**
   * StorageApi().fetchData()
   *
   * This assumes you have a complete SBObjectHandle. Note that
   * if you only have the 'id' and 'verification' fields, you
   * can reconstruct / request the rest. The current interface
   * will return both nonce, salt, and encrypted data.
   *
   * @param h SBObjectHandle - the object to fetch
   * @param returnType 'string' | 'arrayBuffer' - the type of data to return (default: 'arrayBuffer')
   * @returns Promise<ArrayBuffer | string> - the shard data
   */
  fetchData(h: Interfaces.SBObjectHandle, returnType: 'string'): Promise<string>
  fetchData(h: Interfaces.SBObjectHandle, returnType?: 'arrayBuffer'): Promise<ArrayBuffer>
  fetchData(h: Interfaces.SBObjectHandle, returnType: 'string' | 'arrayBuffer' = 'arrayBuffer'): Promise<ArrayBuffer | string> {
    // TODO: change SBObjectHandle from being an interface to being a class
    // update: we have an object class, but still using interface; still a todo here
    // how to nicely validate 'h'
    // _sb_assert(SBValidateObject(h, 'SBObjectHandle'), "fetchData() ERROR: parameter is not an SBOBjectHandle")
    // if (typeof h.verification === 'string') h.verification = new Promise<string>((resolve) => { resolve(h.verification); })
    // _sb_assert(verificationToken, "fetchData(): missing verification token (?)")

    return new Promise(async (resolve, reject) => {
      if (!h) reject('SBObjectHandle is null or undefined')
      const verificationToken = await h.verification
      const useServer = h.shardServer ? h.shardServer + '/api/v1' : (this.shardServer ? this.shardServer : this.server)
      if (DBG) console.log("fetchData(), fetching from server: " + useServer)
      SBFetch(useServer + '/fetchData?id=' + ensureSafe(h.id) + '&type=' + h.type + '&verification_token=' + verificationToken, { method: 'GET' })
        .then((response: Response) => {
          if (!response.ok) reject(new Error('Network response was not OK'))
          // console.log(response)
          return response.arrayBuffer()
        })
        .then((payload: ArrayBuffer) => {
          return this.#processData(payload, h)
        })
        .then((payload) => {
          // _localStorage.setItem(`${h.id}_cache`, arrayBufferToBase64(payload))
          if (returnType === 'string') resolve(sbCrypto.ab2str(new Uint8Array(payload)))
          else resolve(payload)
        })
        .catch((error: Error) => { reject(error) })
    })
  }

  /**
   * StorageApi().retrieveData()
   * retrieves an object from storage
   */
  async retrieveImage(imageMetaData: ImageMetaData,
    controlMessages: Array<ChannelMessage>, imageId?: string, imageKey?: string, imageType?: SBObjectType): Promise<Dictionary<any>> {
    console.trace("retrieveImage()")
    console.log(imageMetaData)
    const id = imageId ? imageId : imageMetaData.previewId;
    const key = imageKey ? imageKey : imageMetaData.previewKey;
    const type = imageType ? imageType : 'p';

    const control_msg = controlMessages.find((ctrl_msg) => ctrl_msg.id && ctrl_msg.id == id)
    console.log(control_msg)
    if (control_msg) {
      _sb_assert(control_msg.verificationToken, "retrieveImage(): verificationToken missing (?)")
      _sb_assert(control_msg.id, "retrieveImage(): id missing (?)")
      const obj: Interfaces.SBObjectHandle = {
        type: type,
        id: control_msg.id!,
        key: key!,
        verification: new Promise((resolve, reject) => {
          if (control_msg.verificationToken)
            resolve(control_msg.verificationToken)
          else
            reject("retrieveImage(): verificationToken missing (?)")
        })
      }
      const img = await this.fetchData(obj)
      console.log(img)
      return { 'url': 'data:image/jpeg;base64,' + arrayBufferToBase64(img, 'b64') };
    } else {
      return { 'error': 'Failed to fetch data - missing control message for that image' };
    }
  }

  /* Unused Currently
  migrateStorage() {
  }
  fetchDataMigration() {
  }
   */

} /* class StorageApi */


/**  Snackabra
   * The main class for interacting with SB servers
   * 
   * It is a singleton, so you can only have one instance of it.
   * It is guaranteed to be synchronous, so you can use it right away.
   * It is also guaranteed to be thread-safe, so you can use it from multiple
   * threads.
   * 
  * Constructor expects an object with the names of the matching servers, for example
  * below shows the miniflare local dev config. Note that 'new Snackabra()' is
  * guaranteed synchronous, so can be 'used' right away. You can optionally call
  * without a parameter in which case SB will ping known servers.
  *
  * @example
  * ```typescript
  *     const sb = new Snackabra({
  *       channel_server: 'http://127.0.0.1:4001',
  *       channel_ws: 'ws://127.0.0.1:4001',
  *       storage_server: 'http://127.0.0.1:4000'
  *     })
  * ```
  *
  */
class Snackabra {
  // xTODO: multiple storage and multiple channel connections
  //        channels tell us what storage to use
  #storage!: StorageApi
  #channel!: Channel
  // #defaultIdentity = new Identity();
  // defaultIdentity?: Identity
  #preferredServer?: SBServer
  #version = version

  /**
  * @param args - optional object with the names of the matching servers, for example
  * below shows the miniflare local dev config. Note that 'new Snackabra()' is
  * guaranteed synchronous, so can be 'used' right away. You can optionally call
  * without a parameter in which case SB will ping known servers.
  * @param DEBUG - optional boolean to enable debug logging
  */
  constructor(args?: SBServer, DEBUG: boolean = false) {
    console.warn(`==== CREATING Snackabra object generation: ${this.version} ====`)
    if (args) {
      this.#preferredServer = Object.assign({}, args)
      this.#storage = new StorageApi(args.storage_server, args.channel_server, args.shard_server ? args.shard_server : undefined)
      if (DEBUG) DBG = true
      if (DBG) console.warn("++++ Snackabra constructor ++++ setting DBG to TRUE ++++");
    }

  }


  /**
   * Connects to :term:`Channel Name` on this SB config.
   * Returns a channel socket promise right away, but it
   * will not be ready until the ``ready`` promise is resolved.
   * 
   * Note that if you have a preferred server then the channel
   * object will be returned right away, but the ``ready`` promise
   * will still be pending. If you do not have a preferred server,
   * then the ``ready`` promise will be resolved when at least
   * one of the known servers is responding and ready.
   * 
   * @param channelName - the name of the channel to connect to
   * @param key - optional key to use for encryption/decryption
   * @param channelId - optional channel id to use for encryption/decryption
   * @returns a channel object
   */
  connect(onMessage: (m: ChannelMessage) => void, key?: JsonWebKey, channelId?: string /*, identity?: SB384 */): Promise<ChannelSocket> {
    if (DBG) {
      console.log("++++ Snackabra.connect() ++++")
      if (key) console.log(key)
      if (channelId) console.log(channelId)
    }
    return new Promise<ChannelSocket>(async (resolve) => {
      if (this.#preferredServer)
        // if we have a preferred server then we do not have to wait for 'ready'
        resolve(new ChannelSocket(this.#preferredServer!, onMessage, key, channelId))
      else
        // otherwise we have to wait for at least one of them to be 'ready', or we won't know which one to use
        resolve(Promise.any(SBKnownServers.map((s) => (new ChannelSocket(s, onMessage, key, channelId)).ready)))
    })
  }

  // if there's a 'preferred' (only) server then we we can return a promise right away
  // return new Promise<ChannelSocket>((resolve, reject) => {

  // else Promise.any(SBKnownServers.map((s) => (new ChannelSocket(s, onMessage, key, channelId))))
  //   .then((c) => { console.log("Got channel:"); console.log(c); resolve(c.ready); })
  //   .catch((e) => { console.log("No known servers responding to channel"); reject(e); })

  // Promise.any(this.#preferredServer
  //   ? [new ChannelSocket(this.#preferredServer!, onMessage, key, channelId)]
  //   : SBKnownServers.map((s) => (new ChannelSocket(s, onMessage, key, channelId))))
  //   .then((c) => { console.log("Got channel:"); console.log(c); resolve(c); })
  //   .catch((e) => { console.log("No known servers responding to channel"); reject(e); })
  /// })
  // }

  /**
   * Creates a new channel. Currently uses trivial authentication.
   * Returns a promise to a ''SBChannelHandle'' object
   * (which includes the :term:`Channel Name`).
   * Note that this method does not connect to the channel,
   * it just creates (authorizes) it.
   * 
   * @param sbServer - the server to use
   * @param serverSecret - the server secret
   * @param keys - optional keys to use for encryption/decryption
   */
  create(sbServer: SBServer, serverSecret: string, keys?: JsonWebKey): Promise<SBChannelHandle> {
    return new Promise<SBChannelHandle>(async (resolve, reject) => {
      try {
        const { channelData, exportable_privateKey } = await newChannelData(keys)
        channelData.SERVER_SECRET = serverSecret
        const data: Uint8Array = new TextEncoder().encode(JSON.stringify(channelData));
        let resp: Dictionary<any> = await SBFetch(sbServer.channel_server + '/api/room/' + channelData.roomId + '/uploadRoom', {
          method: 'POST',
          body: data
        });
        resp = await resp.json();
        if (resp.success) {
          // await this.connect(channelId, identity);
          // _localStorage.setItem(channelId, JSON.stringify(exportable_privateKey)) // TODO
          resolve({ channelId: channelData.roomId!, key: exportable_privateKey })
        } else {
          reject(JSON.stringify(resp));
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Connects to a channel.
   */
  get channel(): Channel {
    return this.#channel;
  }

  /**
   * Returns the storage API.
   */
  get storage(): StorageApi {
    return this.#storage;
  }

  /**
   * Returns the crypto API.
   */
  get crypto(): SBCrypto {
    return sbCrypto;
  }

  get version(): string {
    return this.#version;
  }


} /* class Snackabra */

/******************************************************************************************************/
//#region - exporting stuff
export type {
  ChannelData,
  ChannelKeyStrings,
  ImageMetaData
}

export {
  Channel,
  // ChannelApi,
  SBMessage,
  Snackabra,
  SBCrypto,
  SB384,
  arrayBufferToBase64,
  sbCrypto,
  version,
};

export var SB = {
  Snackabra: Snackabra,
  SBMessage: SBMessage,
  Channel: Channel,
  SBCrypto: SBCrypto,
  SB384: SB384,
  arrayBufferToBase64: arrayBufferToBase64,
  sbCrypto: sbCrypto,
  version: version
};

if (!(globalThis as any).SB)
  (globalThis as any).SB = SB;
console.warn(`==== SNACKABRA jslib loaded ${(globalThis as any).SB.version} ====`); // we warn for benefit of Deno
//#endregion - exporting stuff
