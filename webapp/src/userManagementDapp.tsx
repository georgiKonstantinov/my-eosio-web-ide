import * as React from "react";
import { BaseDappPostForm, rpc } from "./baseDappPostForm";
import { BaseDataPanel } from "./BaseDataPanel";



interface PostDataUserManagement {
    id?: number;
    account?: string;
    name?: string;
    isprovider?: boolean;
    iscustomer?: boolean;
    isconsult?: boolean;
    isauditor?: boolean;
    is3pvendor?: boolean;
};



export class PostFormUserManagement extends BaseDappPostForm<PostDataUserManagement> {
    constructor(props: {}) {
        super(props);
        this.state = {
            privateKey: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
            data: {
                id: 0,
                account: "",
                name: "",
                isprovider: false,
                iscustomer: false,
                isconsult: false,
                isauditor: false,
                is3pvendor: false,
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
                        <td>Account</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.account}
                            onChange={e => this.setData({ account: e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Company name</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.name}
                            onChange={e => this.setData({ name: e.target.value })}
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
            <button onClick={e => this.post(this.state.data.account, 'slm.users')}>Create User</button>
            {this.state.error && <div>
                <br />
                Error:
                <code><pre>{this.state.error}</pre></code>
            </div>}
        </div>;
    }
}

export class UsersList extends BaseDataPanel {
    async setContent() {
        const rows = await rpc.get_table_rows({
            json: true, code: 'slm.users', scope: 'slm.users', table: 'slmusers', limit: 1000,
        });
        let content =
            'id              Account           Company Name               isprovider   iscustomer  isconsult  isauditor  is3pvendor\n' +
            '\n';
        for (let row of rows.rows)
            content +=
                (row.id + '').padEnd(15) +
                (row.account).padEnd(16) + '  ' +
                (row.name + '').padEnd(30) +
                (Boolean(row.isprovider) + '').padEnd(13) +
                (Boolean(row.iscustomer) + '').padEnd(12) +
                (Boolean(row.isconsult) + '').padEnd(11) +
                (Boolean(row.isauditor) + '').padEnd(11) +
                Boolean(row.is3pvendor) + '\n';
        this.setState({ content });
    }

}