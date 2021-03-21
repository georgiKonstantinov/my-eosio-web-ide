import * as React from "react";
import * as ReactDOM from "react-dom";
import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

const rpc = new JsonRpc(''); // nodeos and web server are on same port


interface PostDataUsageTracking {
    id?: number;
    company?: string;
    isprovider?: boolean;
    iscustomer?: boolean;
    isconsult?: boolean;
    isauditor?: boolean;
    is3pvendor?: boolean;
};

interface PostFormStateUsageTracking {
    privateKey: string;
    data: PostDataUsageTracking;
    error: string;
};

export class PostFormUsageTracking extends React.Component<{}, PostFormStateUsageTracking> {
    api: Api;

    constructor(props: {}) {
        super(props);
        this.api = new Api({ rpc, signatureProvider: new JsSignatureProvider([]) });
        this.state = {
            privateKey: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
            data: {
                id: 0,
                company: "",
                isprovider: false,
                iscustomer: false,
                isconsult: false,
                isauditor: false,
                is3pvendor: false,
            },
            error: '',
        };
    }

    setData(data: PostDataUsageTracking) {
        this.setState({ data: { ...this.state.data, ...data } });
    }

    async post() {
        try {
            this.api.signatureProvider = new JsSignatureProvider([this.state.privateKey]);
            const result = await this.api.transact(
                {
                    actions: [{
                        account: 'slm.users',
                        name: 'post',
                        authorization: [{
                            actor: this.state.data.company,
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
            <h2 style={{ color: "Green" }}>For to post tracking data will be placed here</h2>
            {/* <table>
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
                        <td>Company</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.company}
                            onChange={e => this.setData({ company: e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Provider</td>
                        <td><input
                            type="checkbox"
                            checked={this.state.data.isprovider}
                            onChange={e => this.setData({ isprovider: e.target.checked })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Customer</td>
                        <td><input
                            type="checkbox"
                            checked={this.state.data.iscustomer}
                            onChange={e => this.setData({ iscustomer: e.target.checked })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Consultant</td>
                        <td><input
                            type="checkbox"
                            checked={this.state.data.isconsult}
                            onChange={e => this.setData({ isconsult: e.target.checked })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Auditor</td>
                        <td><input
                            type="checkbox"
                            checked={this.state.data.isauditor}
                            onChange={e => this.setData({ isauditor: e.target.checked })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Third-party Vendor</td>
                        <td><input
                            type="checkbox"
                            checked={this.state.data.is3pvendor}
                            onChange={e => this.setData({ is3pvendor: e.target.checked })}
                        /></td>
                    </tr>
                </tbody>
            </table>
            <br />
            <button onClick={e => this.post()}>Post</button>
            {this.state.error && <div>
                <br />
                Error:
                <code><pre>{this.state.error}</pre></code>
            </div>} */}
        </div>;
    }
}

export class UsageTrackingData extends React.Component<{}, { content: string }> {
    interval: number;

    constructor(props: {}) {
        super(props);
        this.state = { content: '///' };
    }

    componentDidMount() {
        this.interval = window.setInterval(async () => {
            try {
                const rows = await rpc.get_table_rows({
                    json: true, code: 'slm.tracking', scope: 'slm.tracking', table: 'slmtracking', limit: 1000,
                });
                let content = 
                    'id                Customer          Provider       Component     Version       System ID                System Info                           IPFS hash\n' +
                    '\n';
                for (let row of rows.rows)
                    content +=
                        (row.id + '').padEnd(16) +
                        (row.customer).padEnd(16) + '  ' +
                        (row.provider).padEnd(20) +
                        ((row.component) + '').padEnd(12) +
                        (row.version).padEnd(11) +
                        (row.sysid).padEnd(25) +
                        (row.sysinfo).padEnd(35) +
                        (row.ipfs_hash) + '\n';
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
        return <code><pre>{this.state.content}</pre></code>;
    }
}