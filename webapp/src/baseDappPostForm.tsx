import * as React from "react";
import * as ReactDOM from "react-dom";
import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

export const rpc = new JsonRpc(''); // nodeos and web server are on same port


interface PostFormBaseState<Data> {
    privateKey: string;
    data?: Data;
    error: string;
};

export class BaseDappPostForm<Data> extends React.Component<{}, PostFormBaseState<Data>> {
    api: Api;

    constructor(props: {}) {
        super(props);
        this.api = new Api({ rpc, signatureProvider: new JsSignatureProvider([]) });
    
    }

    setData<Type>(data: Type) {
        this.setState({ data: { ...this.state.data, ...data } });
    }

    async post(actor:string, account: string) {
        try {
            this.api.signatureProvider = new JsSignatureProvider([this.state.privateKey]);
            const result = await this.api.transact(
                {
                    actions: [{
                        account: account,
                        name: 'post',
                        authorization: [{
                            actor: actor,
                            permission: 'active',
                        }],
                        data: this.state.data,
                    }]
                }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });
            console.log(result);
            this.setState({ error: '' });
        } catch (e) {
            if (e.json)
                this.setState({ error: JSON.stringify(e.json, null, 4) });
            else
                this.setState({ error: '' + e });
        }
    }
}