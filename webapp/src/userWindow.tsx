import * as React from "react";
import { PostFormSecureNotification, SecureNotificationData, PrivateSecureNotificationData } from "./secureNotificationDapp";
import { PostFormSoftwareMarketPlace, SoftwareMarketplaceData, PrivateSoftwareMarketplaceData } from "./softwareMarketplaceDapp";

interface UserWindowState {
    showSoftwareProvidertDapp: boolean,
    showCustomerDapp: boolean,
    showReleaseSoftwareDapp: boolean,
    showNotifyCustomersDapp: boolean
};

export class UserWindow extends React.Component<{}, UserWindowState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            showSoftwareProvidertDapp: true,
            showCustomerDapp: false,
            showReleaseSoftwareDapp: true,
            showNotifyCustomersDapp: false
        };
        this.showComponent = this.showComponent.bind(this);
    }

    showComponent(name = "") {
        this.setState({ showSoftwareProvidertDapp: false, showCustomerDapp: false, showReleaseSoftwareDapp: false, showNotifyCustomersDapp: false });
        switch (name) {
            case "showSoftwareProvidertDapp":
                this.setState({ showSoftwareProvidertDapp: true, showReleaseSoftwareDapp: true });
                break;
            case "showCustomerDapp":
                this.setState({ showCustomerDapp: true });
                break;
            case "showReleaseSoftwareDapp":
                this.setState({ showSoftwareProvidertDapp: true, showReleaseSoftwareDapp: true });
                break;
            case "showNotifyCustomersDapp":
                this.setState({ showSoftwareProvidertDapp: true, showNotifyCustomersDapp: true });
                break;
            default:
                null;
        }
    }

    render() {
        const { showSoftwareProvidertDapp, showCustomerDapp, showReleaseSoftwareDapp, showNotifyCustomersDapp } = this.state;
        return <div>
            <h1 style={{ 'color': "#5DADE2", textAlign: "center"}}>Software Lifecycle Manager Security Patch Dapps</h1>
            <br />
            <ul>
                <li><a className={this.state.showSoftwareProvidertDapp ? "clicked" : "notClicked"} onClick={() => this.showComponent("showSoftwareProvidertDapp")}>Software Provider</a></li>
                <li><a className={this.state.showCustomerDapp ? "clicked" : "notClicked"} onClick={() => this.showComponent("showCustomerDapp")}>Customer</a></li>

            </ul>

            <br />
            <br />

            <table className="panel">
                <caption> <h3>Software Provider Dapp</h3></caption>
                <tbody>
                    <ul>
                        <li><a className={this.state.showReleaseSoftwareDapp ? "middleClicked" : "middleNotClicked"} onClick={() => this.showComponent("showReleaseSoftwareDapp")}>Release Software</a></li>
                        <li><a className={this.state.showNotifyCustomersDapp ? "middleClicked" : "middleNotClicked"} onClick={() => this.showComponent("showNotifyCustomersDapp")}>Notify Customers</a></li>

                    </ul>


                    {showSoftwareProvidertDapp && showReleaseSoftwareDapp && <tr>
                        <PostFormSoftwareMarketPlace />
                        <br />
                        <SoftwareMarketplaceData />
                        <br />
                           Check Private Releases:
                        <PrivateSoftwareMarketplaceData />
                    </tr>
                    }

                    {showSoftwareProvidertDapp && showNotifyCustomersDapp && <tr>
                        <PostFormSecureNotification />
                        <br />
                        <SecureNotificationData />
                        <br />
                        Check Private Notifications:
                        <PrivateSecureNotificationData />
                    </tr>}
                </tbody>
            </table>
        </div>;
    }
}