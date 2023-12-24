[JSLib Reference Manual](../jslib2.md) / [Exports](../modules.md) / SBObjectHandle

# Class: SBObjectHandle

SBObjecdtHandle

## Implements

- [`SBObjectHandle_base`](../interfaces/Interfaces.SBObjectHandle_base.md)

## Table of contents

### Constructors

- [constructor](SBObjectHandle.md#constructor)

### Properties

- [actualSize](SBObjectHandle.md#actualsize)
- [dateAndTime](SBObjectHandle.md#dateandtime)
- [fileName](SBObjectHandle.md#filename)
- [fileType](SBObjectHandle.md#filetype)
- [iv](SBObjectHandle.md#iv)
- [lastModified](SBObjectHandle.md#lastmodified)
- [salt](SBObjectHandle.md#salt)
- [savedSize](SBObjectHandle.md#savedsize)
- [shardServer](SBObjectHandle.md#shardserver)
- [version](SBObjectHandle.md#version)

### Accessors

- [id](SBObjectHandle.md#id)
- [id32](SBObjectHandle.md#id32)
- [id64](SBObjectHandle.md#id64)
- [id\_binary](SBObjectHandle.md#id_binary)
- [key](SBObjectHandle.md#key)
- [key32](SBObjectHandle.md#key32)
- [key64](SBObjectHandle.md#key64)
- [key\_binary](SBObjectHandle.md#key_binary)
- [type](SBObjectHandle.md#type)
- [verification](SBObjectHandle.md#verification)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new SBObjectHandle**(`options`): [`SBObjectHandle`](SBObjectHandle.md)

Basic object handle for a shard (all storage).

To RETRIEVE a shard, you need id and verification.

To DECRYPT a shard, you need key, iv, and salt. Current
generation of shard servers will provide (iv, salt) upon
request if (and only if) you have id and verification.

Note that id32/key32 are array32 encoded base62 encoded.

'verification' is a 64-bit integer, encoded as a string
of up 23 characters: it is four 16-bit integers, either
joined by '.' or simply concatenated. Currently all four
values are random, future generation only first three
are guaranteed to be random, the fourth may be "designed".

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`SBObjectHandle`](../modules/Interfaces.md#sbobjecthandle) |

#### Returns

[`SBObjectHandle`](SBObjectHandle.md)

## Properties

### <a id="actualsize" name="actualsize"></a> actualSize

• `Optional` **actualSize**: `number`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[actualSize](../interfaces/Interfaces.SBObjectHandle_base.md#actualsize)

___

### <a id="dateandtime" name="dateandtime"></a> dateAndTime

• `Optional` **dateAndTime**: `string`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[dateAndTime](../interfaces/Interfaces.SBObjectHandle_base.md#dateandtime)

___

### <a id="filename" name="filename"></a> fileName

• `Optional` **fileName**: `string`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[fileName](../interfaces/Interfaces.SBObjectHandle_base.md#filename)

___

### <a id="filetype" name="filetype"></a> fileType

• `Optional` **fileType**: `string`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[fileType](../interfaces/Interfaces.SBObjectHandle_base.md#filetype)

___

### <a id="iv" name="iv"></a> iv

• `Optional` **iv**: `string` \| `Uint8Array`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[iv](../interfaces/Interfaces.SBObjectHandle_base.md#iv)

___

### <a id="lastmodified" name="lastmodified"></a> lastModified

• `Optional` **lastModified**: `number`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[lastModified](../interfaces/Interfaces.SBObjectHandle_base.md#lastmodified)

___

### <a id="salt" name="salt"></a> salt

• `Optional` **salt**: `string` \| `Uint8Array`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[salt](../interfaces/Interfaces.SBObjectHandle_base.md#salt)

___

### <a id="savedsize" name="savedsize"></a> savedSize

• `Optional` **savedSize**: `number`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[savedSize](../interfaces/Interfaces.SBObjectHandle_base.md#savedsize)

___

### <a id="shardserver" name="shardserver"></a> shardServer

• `Optional` **shardServer**: `string`

___

### <a id="version" name="version"></a> version

• **version**: [`SBObjectHandleVersions`](../modules.md#sbobjecthandleversions) = `currentSBOHVersion`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[version](../interfaces/Interfaces.SBObjectHandle_base.md#version)

## Accessors

### <a id="id" name="id"></a> id

• `get` **id**(): `string`

#### Returns

`string`

• `set` **id**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `ArrayBuffer` \| `Base62Encoded` |

#### Returns

`void`

___

### <a id="id32" name="id32"></a> id32

• `get` **id32**(): `Base62Encoded`

#### Returns

`Base62Encoded`

___

### <a id="id64" name="id64"></a> id64

• `get` **id64**(): `string`

#### Returns

`string`

___

### <a id="id_binary" name="id_binary"></a> id\_binary

• `set` **id_binary**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ArrayBuffer` |

#### Returns

`void`

___

### <a id="key" name="key"></a> key

• `get` **key**(): `string`

#### Returns

`string`

• `set` **key**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `ArrayBuffer` \| `Base62Encoded` |

#### Returns

`void`

___

### <a id="key32" name="key32"></a> key32

• `get` **key32**(): `Base62Encoded`

#### Returns

`Base62Encoded`

___

### <a id="key64" name="key64"></a> key64

• `get` **key64**(): `string`

#### Returns

`string`

___

### <a id="key_binary" name="key_binary"></a> key\_binary

• `set` **key_binary**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ArrayBuffer` |

#### Returns

`void`

___

### <a id="type" name="type"></a> type

• `get` **type**(): [`SBObjectType`](../modules.md#sbobjecttype)

#### Returns

[`SBObjectType`](../modules.md#sbobjecttype)

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[type](../interfaces/Interfaces.SBObjectHandle_base.md#type)

___

### <a id="verification" name="verification"></a> verification

• `get` **verification**(): `string` \| `Promise`\<`string`\>

#### Returns

`string` \| `Promise`\<`string`\>

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[verification](../interfaces/Interfaces.SBObjectHandle_base.md#verification)

• `set` **verification**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `Promise`\<`string`\> |

#### Returns

`void`

#### Implementation of

[SBObjectHandle_base](../interfaces/Interfaces.SBObjectHandle_base.md).[verification](../interfaces/Interfaces.SBObjectHandle_base.md#verification)
