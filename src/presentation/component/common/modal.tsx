import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

import {config} from "../../../util/config";

ReactModal.setAppElement(`#root`);

interface IProps extends ReactModal.Props {
    className?: string;
}

export const ReactModalAdapter: React.FC<IProps> = (props) => {
    const {className, ...rest} = props;

    const contentClassName = `${className}__content`;
    const overlayClassName = `${className}__overlay`;
    return (
        <ReactModal
            portalClassName={className}
            className={contentClassName}
            overlayClassName={overlayClassName}
            {...rest}
        />
    );
};

//　規程動作として画面中央へ配置するパターンを利用する場合はこちらを使う
export const Modal = styled(ReactModalAdapter)`
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: ${config().style.zindex.defaultModal};
    opacity: 0;
    &.ReactModal__Overlay--after-open {
      opacity: 1;
    }
    &.ReactModal__Overlay--before-close {
      opacity: 0;
    }
  }

  &__content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &.ReactModal__Content--after-open {
    }
    &.ReactModal__Content--before-close {
    }
  }
`;
