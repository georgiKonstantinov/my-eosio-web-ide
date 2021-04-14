import * as React from "react";
import { BaseDappPostForm, rpc, defaultPrivateKey, defaultPublicKey } from "./baseDappPostForm";
import { BaseDataPanel } from "./BaseDataPanel";

interface PostDataSecureNotification {
    id?: number;
    sender?: string;
    receiver?: string;
    message?: string;
    component?: number;
};

export class PostFormSecureNotification extends BaseDappPostForm<PostDataSecureNotification> {
    constructor(props: {}) {
        super(props);
        this.state = {
            publicKey: defaultPublicKey,
            privateKey: defaultPrivateKey,
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
                                    <td>Reciever Public Key</td>
                                    <td><input
                                        style={{ width: 500 }}
                                        value={this.state.publicKey}
                                        onChange={e => this.setState({ publicKey: e.target.value })}
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
                        <button onClick={e => this.post(this.state.data.sender, 'slm.notify')}>Notify</button>
                        <br />    <br />

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

    encyptData() {
        
    }
}

export class SecureNotificationData extends BaseDataPanel {

    constructor(props: {}) {
        super(props);
        this.state = { content: [], customScope: 'slm.notify', privateKey: defaultPrivateKey, publicKey: defaultPublicKey };
    }

    async setContent() {
        let result = await rpc.get_table_rows({
            json: true, code: 'slm.notify', scope: this.state.customScope, table: 'slmsecnotify', limit: 1000,
        });

        this.setState({ content: result.rows });
    }

    renderTableData() {
        return this.state.content.map((row: any) => {
            const { id, sender, message, component } = row //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{sender}</td>
                    <td>{component}</td>
                    <td>{message}</td>
                </tr>
            )
        })
    }

    render() {
        const custom_scope = this.state.customScope;
        return <div>

            {custom_scope != 'slm.notify' && <table>
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
                {custom_scope == 'slm.notify' && <caption><h4>Public Notifications</h4></caption>}
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Sender</th>
                        <th>Component ID</th>
                        <th>Message</th>
                    </tr>
                    {this.renderTableData()}
                </tbody>
            </table>
        </div >
    }

}

export class PrivateSecureNotificationData extends SecureNotificationData {

    constructor(props: {}) {
        super(props);
        this.state = { content: [], customScope: 'slm.health', privateKey: defaultPrivateKey, publicKey: defaultPublicKey };
    }

}