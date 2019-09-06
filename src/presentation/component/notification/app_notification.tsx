import * as React from 'react';
import styled, {css} from 'styled-components'

import {
    AppNotificationMessage,
    AppNotificationType,
} from "../../../domain/model/app_notification_message";

import {config} from "../../../util/config";

interface IProps {
    appNotificationMessages: AppNotificationMessage[];
    handleOnCloseNotification: (id: string) => (e: any) => void;
}

const NotificationBarComponent: React.FC<IProps> = (props) => {

    const {appNotificationMessages, handleOnCloseNotification} = props;

    return (
        <Wrapper>
            {appNotificationMessages.map((appNotificationMessage: AppNotificationMessage) => {
                const isHidden: boolean = appNotificationMessage.isHidden;
                const id: string = appNotificationMessage.id;
                const message: string = appNotificationMessage.message;
                const appNotificationType: AppNotificationType  = appNotificationMessage.type;

                if (!isHidden) {
                    return (
                        <Inner appNotificationType={appNotificationType}>
                            <NotificationText >
                                {message}
                            </NotificationText>
                            <CloseButton className="fas fa-times" onClick={handleOnCloseNotification(id)}/>
                        </Inner>)
                } else {
                    return []
                }

            })}
        </Wrapper>
    );
};

export default NotificationBarComponent;

const Wrapper = styled.div`
  position: fixed;
  top: 64px;
  right: 0;
  left: 0;
  z-index: ${config().style.zindex.notification};
  color: ${config().style.color.surface};
`;

const Inner = styled.div`
    margin-bottom: 1px;
    height: 60px;
    display: flex;
    align-items: center; 
    justify-content: center;
    ${(props: {appNotificationType: AppNotificationType}) => props.appNotificationType === AppNotificationType.INFO && css`
        color: ${config().style.color.onPrimary};
        background-color: ${config().style.color.primaryDark};
    `}
    ${(props: {appNotificationType: AppNotificationType}) => props.appNotificationType === AppNotificationType.WARN && css`
        color: ${config().style.color.onPrimary};
        background-color: ${config().style.color.secondaryDark};
    `}
    ${(props: {appNotificationType: AppNotificationType}) => props.appNotificationType === AppNotificationType.ERROR && css`
        color: ${config().style.color.onError};
        background-color: ${config().style.color.error};
    `}
    animation:show 1s both;
    
    @keyframes show {
        0% {
            opacity: 0; 
            transform: translate3d(0,-20px,0);
        }
        100% {
            opacity: 1; 
            transform: translate3d(0,0,0);
        }
    }
`;

const NotificationText = styled.span`
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    flex:1;
    text-align: center;
`;


const CloseButton = styled.i`
  margin-right: 16px;
  &:hover {
    cursor: pointer;
  }
`;

