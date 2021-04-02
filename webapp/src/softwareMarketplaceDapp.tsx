import * as React from "react";
import { BaseDappPostForm, rpc } from "./baseDappPostForm";
import { BaseDataPanel } from "./BaseDataPanel";

interface PostDataSoftwareMarketplace {
    id?: number;
    provider?: string;
    productName?: string;
    releasedFor?: string;
    version?: string;
    status?: string;
    info?: string;
    partof?: number[];
    dependencies?: string;
    ipfs_hash?: string[];
};

export class PostFormSoftwareMarketPlace extends BaseDappPostForm<PostDataSoftwareMarketplace> {

    constructor(props: {}) {
        super(props);
        this.state = {
            privateKey: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
            data: {
                id: 0,
                provider: "",
                productName: "",
                releasedFor: "",
                version: "",
                status: "",
                info: "",
                partof: [],
                dependencies: "",
                ipfs_hash: []
            },
            error: '',
        };
    }

    render() {
        return <div>
            <table className="formBorder">
                <tbody>
                    <tr>
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
                                    <td>Product Name</td>
                                    <td><input
                                        style={{ width: 500 }}
                                        value={this.state.data.productName}
                                        onChange={e => this.setData({ productName: e.target.value })}
                                    /></td>
                                </tr>
                                <tr>
                                    <td>Released for</td>
                                    <td><input
                                        style={{ width: 500 }}
                                        value={this.state.data.releasedFor}
                                        onChange={e => this.setData({ releasedFor: e.target.value })}
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
                                        onChange={e => this.setData({ partof: this.spitStringToNubmerArray(e.target.value) })}
                                    /></td>
                                </tr>
                                <tr>
                                    <td>Depends On</td>
                                    <td><input
                                        style={{ width: 500 }}
                                        onChange={e => this.setData({ dependencies: this.spitStringToNubmerArray(e.target.value) })}
                                    /></td>
                                </tr>
                                <tr>
                                    <td>IPFS Hashes</td>
                                    <td><input
                                        style={{ width: 500 }}
                                        onChange={e => this.setData({ ipfs_hash: e.target.value.split(',') })}
                                    /></td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <button onClick={e => this.post(this.state.data.provider, 'slm.swmarket')}>Submit Software to Marketplace</button>
                        <br /> <br />
                        {this.state.error && <div>
                            <br />
                Error:
                <code><pre>{this.state.error}</pre></code>
                        </div>}
                    </tr>
                </tbody>
            </table>
        </div>;
    }


    spitStringToNubmerArray(numberArrayAsString: string) {
        return numberArrayAsString.split(',').map(function (item) { return parseInt(item, 10); })
    }
}

export class SoftwareMarketplaceData extends BaseDataPanel {
    constructor(props: {}) {
        super(props);
        this.state = { content: [], custom_scope: 'slm.swmarket' };
    }

    async setContent() {
        let result = await rpc.get_table_rows({
            json: true, code: 'slm.swmarket', scope: this.state.custom_scope, table: 'slmswmarket', limit: 1000,
        });

        this.setState({ content: result.rows });
    }

    renderTableData() {
        return this.state.content.map((row: any) => {
            const { id, provider, productName, version, status, info, partof, dependencies, ipfs_hash } = row
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{provider}</td>
                    <td>{productName}</td>
                    <td>{version}</td>
                    <td>{status}</td>
                    <td>{info}</td>
                    <td>{this.renderStrinList(partof)}</td>
                    <td>{this.renderStrinList(dependencies)}</td>
                    <td>{this.renderIpfsStringList(ipfs_hash)}</td>
                </tr>
            )
        })
    }



    render() {
        const custom_scope = this.state.custom_scope;
        return <div>
            {custom_scope != 'slm.swmarket' && <table>
                <tbody>
                    <tr>
                        <td>Account</td>
                        <td><input
                            style={{ width: 500 }}
                            value={custom_scope}
                            onChange={e => this.setState({ custom_scope: e.target.value })}
                        /></td>
                    </tr>
                </tbody>
            </table>}
            <br />
            <table id="contents" >
                {custom_scope == 'slm.swmarket' && <caption><h4>Marketplace Data</h4></caption>}
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Provider</th>
                        <th>Component Name</th>
                        <th>Version</th>
                        <th>Status</th>
                        <th>Info</th>
                        <th>Part of</th>
                        <th>Dependencies</th>
                        <th>IPFS Location</th>
                    </tr>
                    {this.renderTableData()}
                </tbody>
            </table>
        </div >
    }

}

export class PrivateSoftwareMarketplaceData extends SoftwareMarketplaceData {

    constructor(props: {}) {
        super(props);
        this.state = { content: [], custom_scope: 'slm.health' };
    }

}
