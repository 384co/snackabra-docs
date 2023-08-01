[JSLib Reference Manual](../jslib2.md) / [Exports](../modules.md) / EncryptedContents

# Interface: EncryptedContents

Encryptedcontents

SB standard wrapping encrypted messages.

Encryption is done with AES-GCM, 16 bytes of salt, The
``contents`` are url-safe base64, same thing with the nonce (iv),
depending on if it's internal or over wire.

## Table of contents

### Properties

- [content](EncryptedContents.md#content)
- [iv](EncryptedContents.md#iv)

## Properties

### <a id="content" name="content"></a> content

• **content**: `string` \| `ArrayBuffer`

___

### <a id="iv" name="iv"></a> iv

• **iv**: `string` \| `Uint8Array`
