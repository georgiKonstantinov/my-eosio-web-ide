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
    ipfs_hash?: string
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
                ipfs_hash: ''
            },
            error: '',
        };
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
                        <td>Component Id</td>
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
                            value={this.state.data.ipfs_hash}
                            onChange={e => this.setData({ ipfs_hash: e.target.value })}
                        /></td>
                    </tr>
                </tbody>
            </table>
            <br />
            <button onClick={e => this.post(this.state.data.customer, 'slm.tracking')}>Submit Tracking Data</button>
            {this.state.error && <div>
                <br />
                Error:
                <code><pre>{this.state.error}</pre></code>
            </div>}
        </div>;

    }
}

export class UsageTrackingData extends BaseDataPanel {
    async setContent() {
        const rows = await rpc.get_table_rows({
            json: true, code: 'slm.tracking', scope: 'slm.tracking', table: 'slmtracking', limit: 1000,
        });
        let content =
            'id                Customer          Provider       ComponentID   Version       System ID                System Info                           IPFS hash\n' +
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
    }
}