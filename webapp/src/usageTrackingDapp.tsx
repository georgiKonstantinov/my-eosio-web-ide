import * as React from "react";
import { BaseDappPostForm, rpc } from "./baseDappPostForm";
import { BaseDataPanel } from "./BaseDataPanel";

interface PostDataUsageTracking {
    id?: number;
    customer?: string;
    provider?: string;
    component?: string;
    version?: string;
    sysid?: string;
    sysinfo?: string,
    ipfs_hash?: string[]
};

export class PostFormUsageTracking extends BaseDappPostForm<PostDataUsageTracking> {

    constructor(props: {}) {
        super(props);
        this.state = {
            privateKey: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
            data: {
                id: 0,
                customer: '',
                provider: '',
                component: '',
                version: '',
                sysid: '',
                sysinfo: '',
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
                                    <td>Company</td>
                                    <td><input
                                        style={{ width: 500 }}
                                        value={this.state.data.customer}
                                        onChange={e => this.setData({ customer: e.target.value })}
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
                                    <td>Component ID</td>
                                    <td><input
                                        style={{ width: 500 }}
                                        value={this.state.data.component}
                                        onChange={e => this.setData({ component: e.target.value })}
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
                                    <td>System ID</td>
                                    <td><input
                                        style={{ width: 500 }}
                                        value={this.state.data.sysid}
                                        onChange={e => this.setData({ sysid: e.target.value })}
                                    /></td>
                                </tr>
                                <tr>
                                    <td>System Info</td>
                                    <td><input
                                        style={{ width: 500 }}
                                        value={this.state.data.sysinfo}
                                        onChange={e => this.setData({ sysinfo: e.target.value })}
                                    /></td>
                                </tr>
                                <tr>
                                    <td>IPFS hash</td>
                                    <td><input
                                        style={{ width: 500 }}
                                        onChange={e => this.setData({ ipfs_hash: e.target.value.split(',') })}
                                    /></td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <button onClick={e => this.post(this.state.data.customer, 'slm.tracking')}>Submit Usage Data</button>
                        <br /><br />
                        {this.state.error && <div>
                            <br />
                Error:
                <code><pre>{this.state.error}</pre></code>
                        </div>}
                    </tr>
                </tbody>
            </table>
        </div >;

    }
}

export class UsageTrackingData extends BaseDataPanel {
    async setContent() {
        let result = await rpc.get_table_rows({
            json: true, code: 'slm.tracking', scope: 'slm.tracking', table: 'slmtracking', limit: 1000,
        });

        this.setState({ content: result.rows });
    }

    renderTableData() {
        return this.state.content.map((row: any) => {
            const { id, customer, provider, component, version, sysid, sysinfo, ipfs_hash } = row
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{customer}</td>
                    <td>{provider}</td>
                    <td>{component}</td>
                    <td>{version}</td>
                    <td>{sysid}</td>
                    <td>{sysinfo}</td>
                    <td>{this.renderIpfsStringList(ipfs_hash)}</td>
                </tr>
            )
        })
    }

    render() {
        const custom_scope = this.state.custom_scope;
        return <div>
            <table id="contents" >
                <caption><h4>Usage Tracking Data</h4></caption>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Provider</th>
                        <th>Component ID</th>
                        <th>version</th>
                        <th>sysid</th>
                        <th>sysinfo</th>
                        <th>IPFS Location</th>
                    </tr>
                    {this.renderTableData()}
                </tbody>
            </table>
        </div >
    }

}
