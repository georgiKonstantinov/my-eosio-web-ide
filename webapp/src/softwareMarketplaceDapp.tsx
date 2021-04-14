import * as React from "react";
import { BaseDappPostForm, rpc, defaultPrivateKey, defaultPublicKey } from "./baseDappPostForm";
import { BaseDataPanel } from "./BaseDataPanel";
import { encrypt, decrypt } from 'eos-encrypt';


const defaultScope = 'slm.swmarket';

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
            privateKey: defaultPrivateKey,
            publicKey: defaultPublicKey,
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
                                    <td>Reciever Public Key</td>
                                    <td><input
                                        style={{ width: 500 }}
                                        value={this.state.publicKey}
                                        onChange={e => this.setState({ publicKey: e.target.value })}
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
                        <button onClick={e => this.post(this.state.data.provider, defaultScope)}>Submit Software to Marketplace</button>
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

    encyptData() {
        var ipfs_hashes = this.state.data.ipfs_hash;
        if (this.state.data.releasedFor != '') {
            for (var index in ipfs_hashes) {
                this.state.data.ipfs_hash[index] = encrypt(this.state.privateKey, this.state.publicKey, ipfs_hashes[index]);
            }
        }
    }
}

export class SoftwareMarketplaceData extends BaseDataPanel {
    constructor(props: {}) {
        super(props);
        this.state = { content: [], customScope: defaultScope, privateKey: defaultPrivateKey, publicKey: defaultPublicKey };
    }

    async setContent() {
        let result = await rpc.get_table_rows({
            json: true, code: defaultScope, scope: this.state.customScope, table: 'slmswmarket', limit: 1000,
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
                    <td>{this.decryptIpfsHashes(ipfs_hash)}</td>
                </tr>
            )
        })
    }

    decryptIpfsHashes(ipfs_hashes: string[]) {
        if (this.state.customScope === defaultScope) {
            return this.renderIpfsStringList(ipfs_hashes);
        }

        if (this.state.privateKey && this.state.publicKey) {
            return ipfs_hashes.map((arrayElement: string) => {
                try {
                    return (
                        <div>
                            <a href={`https://ipfs.io/ipfs/${decrypt(this.state.privateKey, this.state.publicKey, arrayElement)}`}>Download</a> &nbsp;
                        </div>
                    )
                } catch (e) {
                    console.log(e);
                    return (
                        <div>
                            Decpryption failed:  {e.message} &nbsp;
                        </div>
                    )
                }
            });
        }

        return this.renderIpfsStringList(ipfs_hashes);
    }


    render() {
        const custom_scope = this.state.customScope;
        return <div>
            {custom_scope != defaultScope && <table>
                <tbody>
                    <tr>
                        <td>Account</td>
                        <td><input
                            style={{ width: 500 }}
                            value={custom_scope}
                            onChange={e => this.setState({ customScope: e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Private Key</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.privateKey}
                            onChange={e => this.setState({ privateKey: e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Sender Public Key</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.publicKey}
                            onChange={e => this.setState({ publicKey: e.target.value })}
                        /></td>
                    </tr>
                </tbody>
            </table>}
            <br />
            <table id="contents" >
                {custom_scope == defaultScope && <caption><h4>Marketplace Data</h4></caption>}
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
        this.state = { content: [], customScope: 'slm.health', privateKey: defaultPrivateKey, publicKey: defaultPublicKey };
    }

}
