[JSLib Reference Manual](../jslib2.md) / [Exports](../modules.md) / ChannelMessage

# Interface: ChannelMessage

for example the incoming message will look like this (after decryption)

**`Example`**

```ts
 {
   "encrypted":false,
   "contents":"Hello from test04d!",
   "sign":"u7zAM-1fNLZjmuayOkwWvXTBGqMEimOuzp1DJGX4ECg",
   "image":"",
   "imageMetaData":{},
   "sender_pubKey":
       {
         "crv":"P-384","ext":true,"key_ops":[],"kty":"EC",
         "x":"edqHd4aUn7dGsuDMQxtvzuw-Q2N7l77HBW81KvWj9qtzU7ab-sFHUBqogg2PKihj",
         "y":"Oqp27bXL4RUcAHpWUEFHZdyEuhTo8_8oyTsAKJDk1g_NQOA0FR5Sy_8ViTTWS9wT"
       },
   "sender_username":"TestBot",
   "image_sign":"3O0AYKthtWWYUX3AWDmdU4kTR49UyNyaA937CfKtcQw",
   "imageMetadata_sign":"4LmewpsH6TcRhHYQLivd4Ce87SI1AJIaezhJB5sdD7M"
 }
 ```

## Table of contents

### Properties

- [\_id](ChannelMessage.md#_id)
- [channelID](ChannelMessage.md#channelid)
- [contents](ChannelMessage.md#contents)
- [control](ChannelMessage.md#control)
- [encrypted](ChannelMessage.md#encrypted)
- [encrypted\_contents](ChannelMessage.md#encrypted_contents)
- [id](ChannelMessage.md#id)
- [image](ChannelMessage.md#image)
- [imageMetaData](ChannelMessage.md#imagemetadata)
- [imageMetadata\_sign](ChannelMessage.md#imagemetadata_sign)
- [image\_sign](ChannelMessage.md#image_sign)
- [keys](ChannelMessage.md#keys)
- [motd](ChannelMessage.md#motd)
- [ready](ChannelMessage.md#ready)
- [replyTo](ChannelMessage.md#replyto)
- [roomLocked](ChannelMessage.md#roomlocked)
- [sendTo](ChannelMessage.md#sendto)
- [sender\_pubKey](ChannelMessage.md#sender_pubkey)
- [sender\_username](ChannelMessage.md#sender_username)
- [sign](ChannelMessage.md#sign)
- [system](ChannelMessage.md#system)
- [text](ChannelMessage.md#text)
- [timestamp](ChannelMessage.md#timestamp)
- [timestampPrefix](ChannelMessage.md#timestampprefix)
- [type](ChannelMessage.md#type)
- [user](ChannelMessage.md#user)
- [verificationToken](ChannelMessage.md#verificationtoken)
- [whisper](ChannelMessage.md#whisper)
- [whispered](ChannelMessage.md#whispered)

## Properties

### <a id="_id" name="_id"></a> \_id

• `Optional` **\_id**: `string`

___

### <a id="channelid" name="channelid"></a> channelID

• `Optional` **channelID**: `string`

___

### <a id="contents" name="contents"></a> contents

• `Optional` **contents**: `string`

___

### <a id="control" name="control"></a> control

• `Optional` **control**: `boolean`

___

### <a id="encrypted" name="encrypted"></a> encrypted

• `Optional` **encrypted**: `boolean`

___

### <a id="encrypted_contents" name="encrypted_contents"></a> encrypted\_contents

• `Optional` **encrypted\_contents**: [`EncryptedContents`](EncryptedContents.md)

___

### <a id="id" name="id"></a> id

• `Optional` **id**: `string`

___

### <a id="image" name="image"></a> image

• `Optional` **image**: `string`

___

### <a id="imagemetadata" name="imagemetadata"></a> imageMetaData

• `Optional` **imageMetaData**: [`ImageMetaData`](ImageMetaData.md)

___

### <a id="imagemetadata_sign" name="imagemetadata_sign"></a> imageMetadata\_sign

• `Optional` **imageMetadata\_sign**: `string`

___

### <a id="image_sign" name="image_sign"></a> image\_sign

• `Optional` **image\_sign**: `string`

___

### <a id="keys" name="keys"></a> keys

• `Optional` **keys**: [`ChannelKeyStrings`](ChannelKeyStrings.md)

___

### <a id="motd" name="motd"></a> motd

• `Optional` **motd**: `string`

___

### <a id="ready" name="ready"></a> ready

• `Optional` **ready**: `boolean`

___

### <a id="replyto" name="replyto"></a> replyTo

• `Optional` **replyTo**: `JsonWebKey`

___

### <a id="roomlocked" name="roomlocked"></a> roomLocked

• `Optional` **roomLocked**: `boolean`

___

### <a id="sendto" name="sendto"></a> sendTo

• `Optional` **sendTo**: `string`

___

### <a id="sender_pubkey" name="sender_pubkey"></a> sender\_pubKey

• `Optional` **sender\_pubKey**: `JsonWebKey`

___

### <a id="sender_username" name="sender_username"></a> sender\_username

• `Optional` **sender\_username**: `string`

___

### <a id="sign" name="sign"></a> sign

• `Optional` **sign**: `string`

___

### <a id="system" name="system"></a> system

• `Optional` **system**: `boolean`

___

### <a id="text" name="text"></a> text

• `Optional` **text**: `string`

___

### <a id="timestamp" name="timestamp"></a> timestamp

• `Optional` **timestamp**: `number`

___

### <a id="timestampprefix" name="timestampprefix"></a> timestampPrefix

• `Optional` **timestampPrefix**: `string`

___

### <a id="type" name="type"></a> type

• `Optional` **type**: [`ChannelMessageTypes`](../modules.md#channelmessagetypes)

___

### <a id="user" name="user"></a> user

• `Optional` **user**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_id?` | `JsonWebKey` |
| `name` | `string` |

___

### <a id="verificationtoken" name="verificationtoken"></a> verificationToken

• `Optional` **verificationToken**: `string`

___

### <a id="whisper" name="whisper"></a> whisper

• `Optional` **whisper**: `string`

___

### <a id="whispered" name="whispered"></a> whispered

• `Optional` **whispered**: `boolean`
