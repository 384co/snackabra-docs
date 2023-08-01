[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / SBMessage

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

### Methods

- [send](SBMessage.md#send)

## Constructors

### constructor

• **new SBMessage**(`channel`, `body?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `channel` | [`Channel`](Channel.md) | `undefined` |
| `body` | `string` | `''` |

## Properties

### MAX\_SB\_BODY\_SIZE

• **MAX\_SB\_BODY\_SIZE**: `number`

___

### [SB\_MESSAGE\_SYMBOL]

• **[SB\_MESSAGE\_SYMBOL]**: `boolean` = `true`

___

### channel

• **channel**: [`Channel`](Channel.md)

___

### contents

• **contents**: `SBMessageContents`

___

### ready

• **ready**: `Promise`<[`SBMessage`](SBMessage.md)\>

## Methods

### send

▸ **send**(): `Promise`<`string`\>

SBMessage.send()

#### Returns

`Promise`<`string`\>
