[JSLib Reference Manual](../jslib2.md) / [Exports](../modules.md) / SBChannelHandle

# Interface: SBChannelHandle

SBChannelHandle

Complete descriptor of a channel. 'key' is stringified 'jwk' key.
The key is always private. If it matches the channelId, then it's
an 'owner' key.

## Table of contents

### Properties

- [channelId](SBChannelHandle.md#channelid)
- [key](SBChannelHandle.md#key)

## Properties

### <a id="channelid" name="channelid"></a> channelId

• **channelId**: `string`

___

### <a id="key" name="key"></a> key

• **key**: `JsonWebKey`
