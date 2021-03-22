import * as React from "react";
import { BaseDappPostForm, rpc } from "./baseDappPostForm";
import { BaseDataPanel } from "./BaseDataPanel";

interface PostDataSoftwareMarketplace {
    id?: number;
    provider?: string;
    name?: string;
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
                name: "",
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
            {this.state.error && <div>
                <br />
                Error:
                <code><pre>{this.state.error}</pre></code>
            </div>}
        </div>;
    }

   
    spitStringToNubmerArray(numberArrayAsString: string){
          return numberArrayAsString.split(',').map(function(item) {return parseInt(item, 10);})
    }
}

export class SoftwareMarketplaceData extends BaseDataPanel {
    interval: number;

    async setContent() {
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
    }
}