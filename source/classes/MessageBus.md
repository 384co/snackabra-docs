[JSLib Reference Manual](../jslib2.md) / [Exports](../modules.md) / MessageBus

# Class: MessageBus

SB simple events (mesage bus) class

## Table of contents

### Constructors

- [constructor](MessageBus.md#constructor)

### Properties

- [bus](MessageBus.md#bus)

### Methods

- [#select](MessageBus.md##select)
- [publish](MessageBus.md#publish)
- [subscribe](MessageBus.md#subscribe)
- [unsubscribe](MessageBus.md#unsubscribe)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new MessageBus**()

## Properties

### <a id="bus" name="bus"></a> bus

• **bus**: `Dictionary`<`any`\> = `{}`

## Methods

### <a id="#select" name="#select"></a> #select

▸ `Private` **#select**(`event`): `any`

Safely returns handler for any event

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |

#### Returns

`any`

___

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
