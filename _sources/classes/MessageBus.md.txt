[JSLib Reference Manual](../jslib2.md) / [Exports](../modules.md) / MessageBus

# Class: MessageBus

MessageBus

## Table of contents

### Constructors

- [constructor](MessageBus.md#constructor)

### Properties

- [bus](MessageBus.md#bus)

### Methods

- [publish](MessageBus.md#publish)
- [subscribe](MessageBus.md#subscribe)
- [unsubscribe](MessageBus.md#unsubscribe)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new MessageBus**(): [`MessageBus`](MessageBus.md)

#### Returns

[`MessageBus`](MessageBus.md)

## Properties

### <a id="bus" name="bus"></a> bus

• **bus**: `Dictionary`\<`any`\> = `{}`

## Methods

### <a id="publish" name="publish"></a> publish

▸ **publish**(`event`, `...args`): `void`

Publish

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `...args` | `unknown`[] |

#### Returns

`void`

___

### <a id="subscribe" name="subscribe"></a> subscribe

▸ **subscribe**(`event`, `handler`): `void`

Subscribe. 'event' is a string, special case '*' means everything
 (in which case the handler is also given the message)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `handler` | `CallableFunction` |

#### Returns

`void`

___

### <a id="unsubscribe" name="unsubscribe"></a> unsubscribe

▸ **unsubscribe**(`event`, `handler`): `void`

Unsubscribe

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `handler` | `CallableFunction` |

#### Returns

`void`
