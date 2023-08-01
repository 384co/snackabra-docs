[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / ChannelKeys

# Interface: ChannelKeys

ChannelKeys

All keys relevant for a given channel, in decoded (CryptoKey) form.
They are sent over channels as a message (see ChannelKeysMessage);
in export/import code they may be in the intermediary form of
strings (see ChannelKeyStrings).

**`Example`**

```ts
{ "ready": true,
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
```

## Table of contents

### Properties

- [encryptionKey](ChannelKeys.md#encryptionkey)
- [guestKey](ChannelKeys.md#guestkey)
- [lockedKey](ChannelKeys.md#lockedkey)
- [ownerKey](ChannelKeys.md#ownerkey)
- [ownerPubKeyX](ChannelKeys.md#ownerpubkeyx)
- [privateKey](ChannelKeys.md#privatekey)
- [publicSignKey](ChannelKeys.md#publicsignkey)
- [signKey](ChannelKeys.md#signkey)

## Properties

### encryptionKey

• **encryptionKey**: `CryptoKey`

___

### guestKey

• `Optional` **guestKey**: `CryptoKey`

___

### lockedKey

• `Optional` **lockedKey**: `JsonWebKey`

___

### ownerKey

• **ownerKey**: `CryptoKey`

___

### ownerPubKeyX

• **ownerPubKeyX**: `string`

___

### privateKey

• `Optional` **privateKey**: `CryptoKey`

___

### publicSignKey

• **publicSignKey**: `CryptoKey`

___

### signKey

• **signKey**: `CryptoKey`
