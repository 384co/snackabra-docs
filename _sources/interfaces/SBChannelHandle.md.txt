[JSLib Reference Manual](../jslib2.md) / [Exports](../modules.md) / SBChannelHandle

# Interface: SBChannelHandle

SBChannelHandle

Complete descriptor of a channel. SBUserKeyString (previously 'key')
is a canonical format of stringified version of 'jwk'..
The underlying key is always private. If it corresponds to the channelId,
then it's an 'owner' key.

## Table of contents

### Properties

- [[SB\_CHANNEL\_HANDLE\_SYMBOL]](SBChannelHandle.md#[sb_channel_handle_symbol])
- [channelId](SBChannelHandle.md#channelid)
- [channelServer](SBChannelHandle.md#channelserver)
- [userKeyString](SBChannelHandle.md#userkeystring)

## Properties

### <a id="[sb_channel_handle_symbol]" name="[sb_channel_handle_symbol]"></a> [SB\_CHANNEL\_HANDLE\_SYMBOL]

• `Optional` **[SB\_CHANNEL\_HANDLE\_SYMBOL]**: `boolean`

___

### <a id="channelid" name="channelid"></a> channelId

• **channelId**: `string`

___

### <a id="channelserver" name="channelserver"></a> channelServer

• `Optional` **channelServer**: `string`

___

### <a id="userkeystring" name="userkeystring"></a> userKeyString

• **userKeyString**: `string`
