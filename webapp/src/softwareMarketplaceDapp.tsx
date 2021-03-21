import * as React from "react";
import * as ReactDOM from "react-dom";
import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

const rpc = new JsonRpc(''); // nodeos and web server are on same port


interface PostDataSoftwareMarketplace {
    id?: number;
    provider?: string;
    name?: string;
    version?: string;
    status?: string;
    info?: string;
    partof?: string;
    dependencies?: string;
    ipfs_hash?: string;
};

interface PostFormStateSoftwareMarketplace {
    privateKey: string;
    data: PostDataSoftwareMarketplace;
    error: string;
};

export class PostFormSoftwareMarketPlace extends React.Component<{}, PostFormStateSoftwareMarketplace> {
    api: Api;

    constructor(props: {}) {
        super(props);
        this.api = new Api({ rpc, signatureProvider: new JsSignatureProvider([]) });
        this.state = {
            privateKey: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
            data: {
                id: 0,
                provider: "",
                name: "",
                version: "",
                status: "",
                info: "",
                partof: "",
                dependencies: "",
                ipfs_hash: ""
            },
            error: '',
        };
    }

    setData(data: PostDataSoftwareMarketplace) {
        this.setState({ data: { ...this.state.data, ...data } });
    }

    async post() {
        try {
            this.api.signatureProvider = new JsSignatureProvider([this.state.privateKey]);
            const result = await this.api.transact(
                {
                    actions: [{
                        account: 'slm.swmarket',
                        name: 'post',
                        authorization: [{
                            actor: this.state.data.provider,
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
                        <td>Provider</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.provider}
                            onChange={e => this.setData({ provider: e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.name}
                            onChange={e => this.setData({ name: e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Version</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.version}
                            onChange={e => this.setData({ version: e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.status}
                            onChange={e => this.setData({ status: e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Info</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.info}
                            onChange={e => this.setData({ info: e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Part Of</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.partof}
                            onChange={e => this.setData({ partof: e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Depends On</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.dependencies}
                            onChange={e => this.setData({ dependencies: e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>IPFS Hashes</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.ipfs_hash}
                            onChange={e => this.setData({ ipfs_hash: e.target.value })}
                        /></td>
                    </tr>
                </tbody>
            </table>
            <br />
            <button onClick={e => this.post()}>Submit Software to Marketplace</button>
            {this.state.error && <div>
                <br />
                Error:
                <code><pre>{this.state.error}</pre></code>
            </div>}
        </div>;
    }
}

export class SoftwareMarketplaceData extends React.Component<{}, { content: string }> {
    interval: number;

    constructor(props: {}) {
        super(props);
        this.state = { content: '///' };
    }

    componentDidMount() {
        this.interval = window.setInterval(async () => {
            try {
                const rows = await rpc.get_table_rows({
                    json: true, code: 'slm.swmarket', scope: 'slm.swmarket', table: 'slmswmarket', limit: 1000,
                });
                let content =
                    'id                Provider                      Name                          Version            Status           Info                Part Of           Depends On             IPFS Hash\n' +
                    '\n';
                for (let row of rows.rows)
                    content +=
                        (row.id + '').padEnd(16) +
                        (row.provider).padEnd(20) + '  ' +
                        (row.name).padEnd(39) + '  ' +
                        (row.version).padEnd(17) + '  ' +
                        (row.status).padEnd(11) + '  ' +
                        (row.info).padEnd(22) + '  ' +
                        (row.partof + '').padEnd(18) +
                        (row.dependencies + '').padEnd(20) +
                        (row.ipfs_hash + '') + '\n';
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