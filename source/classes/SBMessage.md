[JSLib Reference Manual](../jslib2.md) / [Exports](../modules.md) / SBMessage

# Class: SBMessage

Class SBMessage

Body should be below 32KiB, though it tolerates up to 64KiB

## Table of contents

### Constructors

- [constructor](SBMessage.md#constructor)

### Properties

- [MAX\_SB\_BODY\_SIZE](SBMessage.md#max_sb_body_size)
- [[SB\_MESSAGE\_SYMBOL]](SBMessage.md#[sb_message_symbol])
- [channel](SBMessage.md#channel)
- [contents](SBMessage.md#contents)
- [ready](SBMessage.md#ready)

### Accessors

- [encryptionKey](SBMessage.md#encryptionkey)
- [sendToPubKey](SBMessage.md#sendtopubkey)

### Methods

- [send](SBMessage.md#send)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new SBMessage**(`channel`, `bodyParameter?`, `sendToJsonWebKey?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `channel` | [`Channel`](Channel.md) | `undefined` |
| `bodyParameter` | `string` \| `SBMessageContents` | `''` |
| `sendToJsonWebKey?` | `JsonWebKey` | `undefined` |

## Properties

### <a id="max_sb_body_size" name="max_sb_body_size"></a> MAX\_SB\_BODY\_SIZE

• **MAX\_SB\_BODY\_SIZE**: `number`

___

### <a id="[sb_message_symbol]" name="[sb_message_symbol]"></a> [SB\_MESSAGE\_SYMBOL]

• **[SB\_MESSAGE\_SYMBOL]**: `boolean` = `true`

___

### <a id="channel" name="channel"></a> channel

• **channel**: [`Channel`](Channel.md)

___

### <a id="contents" name="contents"></a> contents

• **contents**: `SBMessageContents`

___

### <a id="ready" name="ready"></a> ready

• **ready**: `Promise`<[`SBMessage`](SBMessage.md)\>

## Accessors

### <a id="encryptionkey" name="encryptionkey"></a> encryptionKey

• `get` **encryptionKey**(): `undefined` \| `CryptoKey`

#### Returns

`undefined` \| `CryptoKey`

___

### <a id="sendtopubkey" name="sendtopubkey"></a> sendToPubKey

• `get` **sendToPubKey**(): `undefined` \| `JsonWebKey`

#### Returns

`undefined` \| `JsonWebKey`

## Methods

### <a id="send" name="send"></a> send

▸ **send**(): `Promise`<`string`\>

SBMessage.send()

#### Returns

`Promise`<`string`\>
