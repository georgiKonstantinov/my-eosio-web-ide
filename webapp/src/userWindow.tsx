import * as React from "react";
import { PostFormSecureNotification, SecureNotificationData, PrivateSecureNotificationData } from "./secureNotificationDapp";

interface UserWindowState {
    showUserManagementDapp: boolean,
    showUsageTrackingDapp: boolean,
    showSoftwareMarketplaceDapp: boolean,
    showSecureNotificationsDapp: boolean,
};

export class UserWindow extends React.Component<{}, UserWindowState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            showSecureNotificationsDapp: true,
            showUserManagementDapp: false,
            showUsageTrackingDapp: false,
            showSoftwareMarketplaceDapp: false,
        };
        this.showComponent = this.showComponent.bind(this);
    }

    showComponent(name = "") {
        this.setState({ showUserManagementDapp: false, showUsageTrackingDapp: false, showSoftwareMarketplaceDapp: false, showSecureNotificationsDapp: false });
        switch (name) {
            case "showUserManagementDapp":
                this.setState({ showUserManagementDapp: true });
                break;
            case "showUsageTrackingDapp":
                this.setState({ showUsageTrackingDapp: true });
                break;
            case "showSoftwareMarketplaceDapp":
                this.setState({ showSoftwareMarketplaceDapp: true });
                break;
            case "showSecureNotificationsDapp":
                this.setState({ showSecureNotificationsDapp: true });
                break;
            default:
                null;
        }
    }

    render() {
        const { showSecureNotificationsDapp } = this.state;
        return <div>
            <h1 style={{ 'color': "#5DADE2" }}>Software Lifecycle Manager Security Patch Dapps</h1>
            <br />
            <ul>
                <li><a className={this.state.showSecureNotificationsDapp ? "clicked" : "notClicked"} onClick={() => this.showComponent("showSecureNotificationsDapp")}>Secure Notifications</a></li>
                <li><a className={this.state.showUserManagementDapp ? "clicked" : "notClicked"} onClick={() => this.showComponent("showUserManagementDapp")}>Users Mananagement</a></li>

            </ul>
            <br />
            <br />

            {showSecureNotificationsDapp && <table className="panel">
                <caption> <h3>Secure Nofitications Dapp</h3></caption>
                <tbody>
                    <tr>
                        <PostFormSecureNotification />
                        <br />
                        <SecureNotificationData />
                        <br />
        Private Notifications:
        <PrivateSecureNotificationData />
                    </tr>

                </tbody>
            </table>}
        </div>;
    }
}