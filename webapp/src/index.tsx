import * as React from "react";
import * as ReactDOM from "react-dom";
import { PostFormSecureNotification, SecureNotificationData } from "./secureNotificationDApp";
import { PostFormUserManagement, UsersList } from "./userManagementDApp";
import { PostFormUsageTracking, UsageTrackingData } from "./usageTrackingDApp";
import { PostFormSoftwareMarketPlace, SoftwareMarketplaceData } from "./softwareMarketplaceDApp";

interface MainWindowState {
    showUserManagementDapp: boolean,
    showUsageTrackingDapp: boolean,
    showSoftwareMarketplaceDapp: boolean,
    showSecureNotificationsDapp: boolean,
};

class MainWindow extends React.Component<{}, MainWindowState> {

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
        const { showUserManagementDapp, showUsageTrackingDapp, showSoftwareMarketplaceDapp, showSecureNotificationsDapp } = this.state;
        let userManagementButtonBackgroud = this.state.showUserManagementDapp ? 'white' : 'blue';

        return <div>
            <h1 style={{ 'color': "#5DADE2" }}>Software Lifecycle Manager DApps</h1>
            <br />
            <ul>
                <li><a className={this.state.showSecureNotificationsDapp ? "clicked" : "notClicked"} onClick={() => this.showComponent("showSecureNotificationsDapp")}>Secure Notifications</a></li>
                <li><a className={this.state.showUserManagementDapp ? "clicked" : "notClicked"} onClick={() => this.showComponent("showUserManagementDapp")}>Users Mananagement</a></li>
                <li><a className={this.state.showUsageTrackingDapp ? "clicked" : "notClicked"} onClick={() => this.showComponent("showUsageTrackingDapp")}>Usage Tracking</a></li>
                <li><a className={this.state.showSoftwareMarketplaceDapp ? "clicked" : "notClicked"} onClick={() => this.showComponent("showSoftwareMarketplaceDapp")}>Software Marketplace</a></li>
            </ul>
            <br />
            <br />

            {showSecureNotificationsDapp && <table className="panel">
                <caption> <h3>Secure Nofitications DApp</h3></caption>
                <tbody>
                    <tr>
                        <PostFormSecureNotification />
                        <br />
        Notifications:
        <SecureNotificationData />
                    </tr>
                </tbody>
            </table>}

            {showUserManagementDapp && <table className="panel">
                <caption> <h3>User Mananagement Panel DApp</h3></caption>
                <tbody>
                    <tr>
                        <PostFormUserManagement />
                        <br />
        User list:
        <UsersList />
                    </tr>
                </tbody>
            </table>}


            {showUsageTrackingDapp && <table className="panel">
                <caption><h3>Usage Tracking DApp</h3></caption>
                <tbody>
                    <tr>
                        <PostFormUsageTracking />
                        <br />
        Usage Tracking Data:
        <UsageTrackingData />
                    </tr>
                </tbody>
            </table>}

            {showSoftwareMarketplaceDapp && <table className="panel">
                <caption><h3>Software Marketplace DApp</h3></caption>
                <tbody>
                    <tr>
                        <PostFormSoftwareMarketPlace />
                        <br />
        Marketplace Data:
        <SoftwareMarketplaceData />
                    </tr>
                </tbody>
            </table>}
        </div>;
    }
}
ReactDOM.render(

    <div> <MainWindow /> </div>,
    document.getElementById("RootMainWindow")
);
