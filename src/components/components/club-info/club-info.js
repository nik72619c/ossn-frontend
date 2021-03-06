import "./club-info.scss";

import React from "react";
import MediaQuery from "react-responsive";

import { Email, Github, Link, Map } from "./../formated-text/formated-text";
import ShadowBox from "./../shadow-box/shadow-box";
import Shape from "./../shape/shape";
import Event from "../event/event";

/*
  Contains the `ClubInfo`  and `ClubInfoItem` components.
*/
/*
  An Item of the list
  props:
    link (String): the link that it points to.
*/
export class ClubInfoItem extends React.PureComponent {
  render() {
    let classes = ["club-info__item"];
    if (this.props.major) classes.push("club-info__item--major");
    if (this.props.map) classes.push("club-info__item--map");

    let content;
    if (this.props.link) {
      content = (
        <a
          href={this.props.link}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.join(" ")}
        >
          {this.props.children}
        </a>
      );
    } else if (this.props.email) {
      content = (
        <a href={this.props.email} className={classes.join(" ")}>
          {this.props.children}
        </a>
      );
    } else {
      content = <div className={classes.join(" ")}>{this.props.children}</div>;
    }

    return <>{content}</>;
  }
}

/* Wrappers for cleaner code */
const LocationInfo = ({ location, lng, lat }) => {
  if (lng && lat) {
    const link =
      "https://www.openstreetmap.org/directions?from=&to=" +
      lat +
      "%2C" +
      lng +
      "&zoom=8";

    return (
      <li className="club-info__item-wrapper club-info__item-wrapper--major club-info__item-wrapper--map">
        <ClubInfoItem major map link={link}>
          <Map value={location} />
        </ClubInfoItem>
      </li>
    );
  }
  return (
    <li className="club-info__item-wrapper club-info__item-wrapper--major club-info__item-wrapper--map">
      <ClubInfoItem major map>
        <Map value={location} />
      </ClubInfoItem>
    </li>
  );
};

const GithubInfo = ({ github }) => (
  <li className="club-info__item-wrapper club-info__item-wrapper--major club-info__item-wrapper--graph">
    <ClubInfoItem link={github} major>
      <Github value={github} />
    </ClubInfoItem>
  </li>
);

const WebpageInfo = ({ clubUrl }) => (
  <li className="club-info__item-wrapper">
    <ClubInfoItem link={clubUrl}>
      <Link value={clubUrl} />
    </ClubInfoItem>
  </li>
);

const EmailInfo = ({ email }) => (
  <li className="club-info__item-wrapper">
    <ClubInfoItem email={`mailto:${email}`}>
      <Email value={email} />
    </ClubInfoItem>
  </li>
);

const EventInfo = ({ event }) => (
  <li className="club-info__item-wrapper">
    <ClubInfoItem>
      <Event event={event} />
    </ClubInfoItem>
  </li>
);

/*
  Box containing information about a club.

  props:
    Club (object): Club object to show information.

*/
export default class ClubInfo extends React.PureComponent {
  getEvents() {
    const now = Math.round(new Date().getTime() / 1000);

    const eventList =
      this.props.club.events &&
      this.props.club.events
        .sort((a, b) => {
          // a.startDate && b.startDate ? (a.startDate > b.a.startDate ? return -1 : return 1):
          if (a.startDate && b.startDate) {
            const aClosingDate = Math.max(a.startDate, a.endDate);
            const bClosingDate = Math.max(b.startDate, b.endDate);
            if (aClosingDate > now && bClosingDate < now) {
              return -1;
            } else if (aClosingDate < now && bClosingDate > now) {
              return 1;
            }

            if (a.startDate > b.startDate) {
              return -1;
            } else {
              return 1;
            }
          } else if (a.startDate) {
            return -1;
          } else {
            return 1;
          }
        })
        .map((event, i) => {
          return <EventInfo event={event} key={event.id} />;
        });
    return eventList;
  }

  render() {
    const { lng, lat, githubUrl, clubUrl, email, address } = this.props.club;
    return (
      <ShadowBox zeroPadding className="club-info__wrapper">
        <ul className="club-info">
          {address && <LocationInfo location={address} lng={lng} lat={lat} />}
          {githubUrl && <GithubInfo github={githubUrl} />}
          {clubUrl && <WebpageInfo clubUrl={clubUrl} />}
          {email && <EmailInfo email={email} />}
          {this.getEvents()}
        </ul>
        <Shape square seafoamBlue className="club-info__shape-square" />
        <MediaQuery minWidth={992}>
          <Shape circle sunnyYellow className="club-info__shape-circle" />
        </MediaQuery>
      </ShadowBox>
    );
  }
}
