[JSLib Reference Manual](../jslib2.md) / [Exports](../modules.md) / SBServer

# Interface: SBServer

## Table of contents

### Properties

- [channel\_server](SBServer.md#channel_server)
- [channel\_ws](SBServer.md#channel_ws)
- [shard\_server](SBServer.md#shard_server)
- [storage\_server](SBServer.md#storage_server)

## Properties

### <a id="channel_server" name="channel_server"></a> channel\_server

• **channel\_server**: `string`

The channel server is the server that handles channel creation,
channel deletion, and channel access. It is also the server that
handles channel messages.

___

### <a id="channel_ws" name="channel_ws"></a> channel\_ws

• **channel\_ws**: `string`

The channel websocket is the websocket that handles channel
messages. It is the same as the channel server, but with a
different protocol.

___

### <a id="shard_server" name="shard_server"></a> shard\_server

• `Optional` **shard\_server**: `string`

"shard" server is a more modern version of the storage server,
generally acting as a caching and/or mirroring layer. It proxies
any new storage to one or more storage servers, and handles
it's own caching behavior. Generally, this will be the fastest
interface, in particular for reading.

___

### <a id="storage_server" name="storage_server"></a> storage\_server

• **storage\_server**: `string`

The storage server is the server that all "shard" (blob) storage
