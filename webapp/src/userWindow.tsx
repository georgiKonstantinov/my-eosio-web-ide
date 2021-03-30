import * as React from "react";
import { PostFormSecureNotification, SecureNotificationData, PrivateSecureNotificationData } from "./secureNotificationDapp";
import { PostFormSoftwareMarketPlace, SoftwareMarketplaceData, PrivateSoftwareMarketplaceData } from "./softwareMarketplaceDapp";
import { PostFormUsageTracking, UsageTrackingData } from "./usageTrackingDapp";

interface UserWindowState {
    showSoftwareProvidertDapp: boolean,
    showCustomerDapp: boolean,
    showReleaseSoftwareDapp: boolean,
    showNotifyCustomersDapp: boolean,
    showNotificationsForProviderDapp: boolean,
    showMyNotificationsDapp: boolean,
    showPublicNotificationsDapp: boolean,
    showSubmitSystemInfoDapp: boolean,
    showDownloadSoftwareDapp: boolean
};

export class UserWindow extends React.Component<{}, UserWindowState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            showSoftwareProvidertDapp: true,
            showCustomerDapp: false,
            showReleaseSoftwareDapp: false,
            showNotifyCustomersDapp: false,
            showNotificationsForProviderDapp: true,
            showMyNotificationsDapp: false,
            showPublicNotificationsDapp: false,
            showSubmitSystemInfoDapp: false,
            showDownloadSoftwareDapp: false
        };
        this.showComponent = this.showComponent.bind(this);
    }

    showComponent(name = "") {
        this.setState({ showSoftwareProvidertDapp: false, showCustomerDapp: false, showReleaseSoftwareDapp: false, showNotifyCustomersDapp: false, showNotificationsForProviderDapp: false, showMyNotificationsDapp: false, showPublicNotificationsDapp: false, showSubmitSystemInfoDapp: false, showDownloadSoftwareDapp: false });
        switch (name) {
            case "showSoftwareProvidertDapp":
                this.setState({ showSoftwareProvidertDapp: true, showReleaseSoftwareDapp: true });
                break;
            case "showCustomerDapp":
                this.setState({ showCustomerDapp: true, showMyNotificationsDapp: true });
                break;
            case "showReleaseSoftwareDapp":
                this.setState({ showSoftwareProvidertDapp: true, showReleaseSoftwareDapp: true });
                break;
            case "showNotifyCustomersDapp":
                this.setState({ showSoftwareProvidertDapp: true, showNotifyCustomersDapp: true });
                break;
            case "showNotificationsForProviderDapp":
                this.setState({ showSoftwareProvidertDapp: true, showNotificationsForProviderDapp: true });
                break;
            case "showMyNotificationsDapp":
                this.setState({ showCustomerDapp: true, showMyNotificationsDapp: true });
                break;
            case "showPublicNotificationsDapp":
                this.setState({ showCustomerDapp: true, showPublicNotificationsDapp: true });
                break;
            case "showSubmitSystemInfoDapp":
                this.setState({ showCustomerDapp: true, showSubmitSystemInfoDapp: true });
                break;
            case "showDownloadSoftwareDapp":
                this.setState({ showCustomerDapp: true, showDownloadSoftwareDapp: true });
                break;

            default:
                null;
        }
    }

    render() {
        const { showSoftwareProvidertDapp, showCustomerDapp, showReleaseSoftwareDapp, showNotifyCustomersDapp, showNotificationsForProviderDapp, showMyNotificationsDapp, showPublicNotificationsDapp, showSubmitSystemInfoDapp, showDownloadSoftwareDapp } = this.state;
        return <div>
            <h1 style={{ 'color': "#5DADE2", textAlign: "center" }}>Software Lifecycle Manager Security Patch Dapps</h1>
            <br />
            <ul>
                <li><a className={this.state.showSoftwareProvidertDapp ? "clicked" : "notClicked"} onClick={() => this.showComponent("showSoftwareProvidertDapp")}>Software Provider</a></li>
                <li><a className={this.state.showCustomerDapp ? "clicked" : "notClicked"} onClick={() => this.showComponent("showCustomerDapp")}>Customer</a></li>
            </ul>

            <br />
            <br />

            {showSoftwareProvidertDapp && <table className="panel">
                <caption> <h3>Software Provider Dapp</h3></caption>
                <tbody>
                    <ul>
                        <li><a className={this.state.showNotificationsForProviderDapp ? "middleClicked" : "middleNotClicked"} onClick={() => this.showComponent("showNotificationsForProviderDapp")}>My Nofications</a></li>
                        <li><a className={this.state.showNotifyCustomersDapp ? "middleClicked" : "middleNotClicked"} onClick={() => this.showComponent("showNotifyCustomersDapp")}>Notify Customers</a></li>
                        <li><a className={this.state.showReleaseSoftwareDapp ? "middleClicked" : "middleNotClicked"} onClick={() => this.showComponent("showReleaseSoftwareDapp")}>Release Software</a></li>
                    </ul>


                    {showReleaseSoftwareDapp && <tr>
                        <PostFormSoftwareMarketPlace />
                        <br />
                        <SoftwareMarketplaceData />
                        <br />
                           Check Private Releases:
                        <PrivateSoftwareMarketplaceData />
                    </tr>
                    }

                    {showNotifyCustomersDapp && <tr>
                        <PostFormSecureNotification />
                        <br />
                        <SecureNotificationData />
                    </tr>}
                    {showNotificationsForProviderDapp && <tr>
                        <br />
                        <PrivateSecureNotificationData />
                    </tr>}
                </tbody>
            </table>}

            {showCustomerDapp && <table className="panel">
                <caption> <h3>Customer Dapp</h3></caption>
                <tbody>
                    <ul>
                        <li><a className={this.state.showMyNotificationsDapp ? "middleClicked" : "middleNotClicked"} onClick={() => this.showComponent("showMyNotificationsDapp")}>My Notifications</a></li>
                        <li><a className={this.state.showPublicNotificationsDapp ? "middleClicked" : "middleNotClicked"} onClick={() => this.showComponent("showPublicNotificationsDapp")}>Public Notifications</a></li>
                        <li><a className={this.state.showSubmitSystemInfoDapp ? "middleClicked" : "middleNotClicked"} onClick={() => this.showComponent("showSubmitSystemInfoDapp")}>Submit System Info</a></li>
                        <li><a className={this.state.showDownloadSoftwareDapp ? "middleClicked" : "middleNotClicked"} onClick={() => this.showComponent("showDownloadSoftwareDapp")}>Download Software</a></li>
                    </ul>

                    {showMyNotificationsDapp && <tr>
                        <br />
                        <PrivateSecureNotificationData />
                    </tr>}

                    {showPublicNotificationsDapp && <tr>
                        <PostFormSecureNotification />
                        <br />
                        <SecureNotificationData />
                    </tr>}

                    {showSubmitSystemInfoDapp &&
                        <tr>
                            <PostFormUsageTracking />
                            <br />
                            <UsageTrackingData />
                        </tr>}

                    {showDownloadSoftwareDapp && <tr>
                        <SoftwareMarketplaceData />
                        <br />
                           Check Private Releases:
                        <PrivateSoftwareMarketplaceData />
                    </tr>
                    }
                </tbody>
            </table>}
        </div>;
    }
}