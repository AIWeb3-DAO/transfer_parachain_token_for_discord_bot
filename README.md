# transfer_token_multi_parrachains
在 https://github.com/NeoSmithX/transfer_token_multi_parrachains 的基础上，增加更多平行链的支持，并通过discord/telegram bot 触发


1. yarn install

2. 用户所有数据只用在config.ts 中填写，并 tsc 编译脚本

3. node dist/src/index.js  运行脚本


tip：
大部分波卡生态的地址使用 5xxxx的即可。 如果调用xcm跨链相关的api的时候，一定谨慎填写地址，5xxxx不一定适用（xcm通常使用的publicKey作为接收地址）。

个人习惯，使用snake_case命名，而不是camelCase。

如果要发送一共10KSM，账户中一定超过10ksm，比如11个（一是因为gas，二是因为keep_alive）

当前，本脚本只支持currency发送，即在KSM链发送KSM，在bifrost链发送BNC，以此类推。后续会增加在单一链发送不同token的支持。


