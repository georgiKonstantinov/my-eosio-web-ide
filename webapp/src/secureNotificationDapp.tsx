import * as React from "react";
import * as ReactDOM from "react-dom";
import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

const rpc = new JsonRpc(''); // nodeos and web server are on same port


interface PostDataSecureNotification {
    id?: number;
    sender?: string;
    receiver?: string;
    message?: string;
    component?: number;
};

interface PostFormStateSecureNotification {
    privateKey: string;
    data: PostDataSecureNotification;
    error: string;
};

export class PostFormSecureNotification extends React.Component<{}, PostFormStateSecureNotification> {
    api: Api;

    constructor(props: {}) {
        super(props);
        this.api = new Api({ rpc, signatureProvider: new JsSignatureProvider([]) });
        this.state = {
            privateKey: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
            data: {
                id: 0,
                sender: '',
                receiver: '',
                message: '',
                component: 1000,
            },
            error: '',
        };
    }

    setData(data: PostDataSecureNotification) {
        this.setState({ data: { ...this.state.data, ...data } });
    }

   async post() {
        try {
            this.api.signatureProvider = new JsSignatureProvider([this.state.privateKey]);
            const result = await this.api.transact(
                {
                    actions: [{
                        account: 'slm.notify',
                        name: 'post',
                        authorization: [{
                            actor: this.state.data.sender,
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

    render() {
        return <div>
            <table>
                <tbody>
                    <tr>
                        <td>Private Key</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.privateKey}
                            onChange={e => this.setState({ privateKey: e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Sender</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.sender}
                            onChange={e => this.setData({ sender: e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Reciever</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.receiver}
                            onChange={e => this.setData({ receiver: e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Component ID</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.component}
                            onChange={e => this.setData({ component: +e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Message</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.message}
                            onChange={e => this.setData({ message: e.target.value })}
                        /></td>
                    </tr>


                </tbody>
            </table>
            <br />
            <button onClick={e => this.post()}>Notify</button>
            {this.state.error && <div>
                <br />
                Error:
                <code><pre>{this.state.error}</pre></code>
            </div>}

        </div>;
    }
}


export class SecureNotificationData extends React.Component<{}, { content: string, custom_scope: string }> {
    interval: number;

    constructor(props: {}) {
        super(props);
        this.state = { content: '///', custom_scope: 'slm.notify' };
    }

    componentDidMount() {
        this.interval = window.setInterval(async () => {
            try {
                const rows = await rpc.get_table_rows({
                    json: true, code: 'slm.notify', scope: this.state.custom_scope, table: 'slmsecnotify', limit: 1000,
                });
                let content =
                    'id                Sender          Component ID       Message\n' +
                    '\n';
                for (let row of rows.rows)
                    content +=
                        (row.id + '').padEnd(16) +
                        (row.sender).padEnd(20) + '  ' +
                        (row.component + '').padEnd(15) +
                        (row.message).padEnd(12) + '\n';
                this.setState({ content });
            } catch (e) {
                if (e.json)
                    this.setState({ content: JSON.stringify(e.json, null, 4) });
                else
                    this.setState({ content: '' + e });
            }

        }, 200);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return <code><pre>{this.state.content}</pre></code>

    }
}

export class PrivateSecureNotificationData extends SecureNotificationData {
    interval: number;

    constructor(props: {}) {
        super(props);
        this.state = { content: '///', custom_scope: 'slm.customer' };
    }

    render() {
        return <div>
            <br />
            <table style={{ border: "hidden" }}>
                <tbody>
                    <tr>
                        <td>Account</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.custom_scope}
                            onChange={e => this.setState({ custom_scope: e.target.value })}
                        /></td>
                    </tr>
                </tbody>
            </table>

            <code><pre>{this.state.content}</pre></code>
        </div>
    }
}