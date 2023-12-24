[JSLib Reference Manual](../jslib2.md) / [Exports](../modules.md) / [Interfaces](../modules/Interfaces.md) / SBObjectHandle\_base

# Interface: SBObjectHandle\_base

[Interfaces](../modules/Interfaces.md).SBObjectHandle_base

## Hierarchy

- **`SBObjectHandle_base`**

  ↳ [`SBObjectHandle_v1`](Interfaces.SBObjectHandle_v1.md)

  ↳ [`SBObjectHandle_v2`](Interfaces.SBObjectHandle_v2.md)

## Implemented by

- [`SBObjectHandle`](../classes/SBObjectHandle.md)

## Table of contents

### Properties

- [[SB\_OBJECT\_HANDLE\_SYMBOL]](Interfaces.SBObjectHandle_base.md#[sb_object_handle_symbol])
- [actualSize](Interfaces.SBObjectHandle_base.md#actualsize)
- [dateAndTime](Interfaces.SBObjectHandle_base.md#dateandtime)
- [fileName](Interfaces.SBObjectHandle_base.md#filename)
- [fileType](Interfaces.SBObjectHandle_base.md#filetype)
- [iv](Interfaces.SBObjectHandle_base.md#iv)
- [lastModified](Interfaces.SBObjectHandle_base.md#lastmodified)
- [salt](Interfaces.SBObjectHandle_base.md#salt)
- [savedSize](Interfaces.SBObjectHandle_base.md#savedsize)
- [type](Interfaces.SBObjectHandle_base.md#type)
- [verification](Interfaces.SBObjectHandle_base.md#verification)
- [version](Interfaces.SBObjectHandle_base.md#version)

## Properties

### <a id="[sb_object_handle_symbol]" name="[sb_object_handle_symbol]"></a> [SB\_OBJECT\_HANDLE\_SYMBOL]

• `Optional` **[SB\_OBJECT\_HANDLE\_SYMBOL]**: `boolean`

___

### <a id="actualsize" name="actualsize"></a> actualSize

• `Optional` **actualSize**: `number`

___

### <a id="dateandtime" name="dateandtime"></a> dateAndTime

• `Optional` **dateAndTime**: `string`

___

### <a id="filename" name="filename"></a> fileName

• `Optional` **fileName**: `string`

___

### <a id="filetype" name="filetype"></a> fileType

• `Optional` **fileType**: `string`

___

### <a id="iv" name="iv"></a> iv

• `Optional` **iv**: `string` \| `Uint8Array`

___

### <a id="lastmodified" name="lastmodified"></a> lastModified

• `Optional` **lastModified**: `number`

___

### <a id="salt" name="salt"></a> salt

• `Optional` **salt**: `string` \| `Uint8Array`

___

### <a id="savedsize" name="savedsize"></a> savedSize

• `Optional` **savedSize**: `number`

___

### <a id="type" name="type"></a> type

• `Optional` **type**: [`SBObjectType`](../modules.md#sbobjecttype)

___

### <a id="verification" name="verification"></a> verification

• `Optional` **verification**: `string` \| `Promise`\<`string`\>

___

### <a id="version" name="version"></a> version

• `Optional` **version**: [`SBObjectHandleVersions`](../modules.md#sbobjecthandleversions)
