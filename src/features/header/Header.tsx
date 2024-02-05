import { Button, Select, Modal, Typography, Popover } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ECurrencyType, ELanguageType } from "./index";
import { EActionType } from "@pages/user/Interface";
import { RegisterPage } from "@pages/user/Register";
import { LoginPage } from "@pages/user/Login";
import { ForgetPage } from "@pages/user/Forget";
import { ChangePage } from "@pages/user/Change";
import { useLocation, useNavigate } from "react-router-dom";
import update from "immutability-helper";
import "./Header.less";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setType, showModal as show, hideModal } from "@features/header/modalShowSlice";
import { getHeader, setHeader } from "@features/header/headerSlice";
import moment from "moment";
import { loginOut } from "@pages/user/LoginFuncs";
import { SideBar } from "@features/sideBar/SideBar";
import classnames from "classnames";

const telList = [
  {
    icon: "/static/image/home/New-Zealand.png",
    country: "New Zealand",
    tel: "+64 98843137",
  },{
    icon: "/static/image/home/Thailand.png",
    country: "Thailand",
    tel: "+66 25027422",
  },{
    icon: "/static/image/home/Indonesia.png",
    country: "Indonesia",
    tel: "+62 2150928922",
  },{
    icon: "/static/image/home/Hong-Kong.png",
    country: "HongKong",
    tel: "+852 38533882",
  },{
    icon: "/static/image/home/Singapore.png",
    country: "Singapore",
    tel: "+65 31290521",
  },{
    icon: "/static/image/home/Australia.png",
    country: "Australia",
    tel: "+61 283173230",
  },{
    icon: "/static/image/home/Tai-Wan.png",
    country: "Taiwan",
    tel: "+886 277553569",
  },{
    icon: "/static/image/home/Malaysia.png",
    country: "Malaysia",
    tel: "+60 1546000597",
  }
]

const { Option } = Select;
export const Header = forwardRef((props: any, ref: any) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const headData = useAppSelector(getHeader);
  const visible = useAppSelector((state) => state.modalShow.visible);
  const userPageType = useAppSelector((state) => state.modalShow.type);
  const dispatch = useAppDispatch();

  const showModal = () => {
    dispatch(show())
  };

  // 判断登陆状态
  const userInfo = useMemo(() => {
    return headData.userInfo;
  }, [headData]);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(hideModal());
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    dispatch(hideModal());
    dispatch(setType(EActionType.login));
  };

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const onClickChage = () => {
    showModal()
    dispatch(setType(EActionType.change));
  }

  const isDisableCurrencySelect = useMemo( () => {
    const disableCurrencyPath = ["/payment"]
    return disableCurrencyPath.some( item => location.pathname.indexOf(item) >= 0 )
  }, [location])

  // 设置语言
  const languageChange = (value: ELanguageType) => {
    i18n.changeLanguage(value);
    switch (value) {
      case ELanguageType.TChinese:{
        moment.locale("zh-hk");
        break;
      }
      case ELanguageType.Chinese:{
        moment.locale("zh-cn");
        break;
      }
      case ELanguageType.Japanese:{
        moment.locale("jp");
        break;
      }
      default:{
        moment.locale("en");
        break;
      }
    }
    // 更新stroe
    dispatch(setHeader(update(headData, { locale: { $set: value } })));
  };

  
  useEffect( () => {
    moment.locale( headData.locale )
    // 未登录用户进入详情页
    if(location.pathname === '/detailpage' && !headData.userInfo.email){
      // 如果为未注册过的用户
      const search = new URLSearchParams(location.search)
      const orderid = search.get("orderid")
      if(!orderid) return;
      // 如果为已注册过的用户则正常展示
      showModal()
    }
  }, [headData.locale, headData.userInfo.email])

  // 设置货币
  const currencyChange = (value: ECurrencyType) => {
    // 更新stroe
    dispatch(setHeader(update(headData, { currency: { $set: value } })));

    if(location.pathname.indexOf('flightlist')!==-1&&location.search!==''){
      return;
    }
    // 刷新页面
    if (location.pathname.indexOf('book') === -1 ) {
      window.location.reload()
    }
  };

  function handleUserPageType(pageType: EActionType) {
    dispatch(setType(pageType));
  }

  const renderUserPage = (userPageType: EActionType) => {
    switch (userPageType) {
      case EActionType.login:
        return <LoginPage handleUserPageType={handleUserPageType} />;
      case EActionType.forget:
        return <ForgetPage handleUserPageType={handleUserPageType} isForget={true}/>;
      case EActionType.register:
        return <RegisterPage handleUserPageType={handleUserPageType} />;
      case EActionType.change:
        return <ChangePage  handleUserPageType={handleUserPageType} />;
      case EActionType.setPwd:
        return <ForgetPage  handleUserPageType={handleUserPageType} />;
      default:
        return <LoginPage handleUserPageType={handleUserPageType} />;
    }
  };

  return (
    <div className="header-box">
      <div className={classnames("header-wrapper blue")}>
        {/* <img
          className="title"
          src="../../static/image/home/logo2.png"
          onClick={(e) => {
            navigate("/");
          }}
        /> */}
        <p className="title">LOGO</p>
        <div className="right-box">
          <Select
            defaultValue={headData.locale}
            value={headData.locale}
            bordered={false}
            dropdownMatchSelectWidth={120}
            onChange={languageChange}
            dropdownClassName="header-select-popup"
          >
            <Option value={ELanguageType.English}>
                English
            </Option>
            <Option value={ELanguageType.TChinese}>
                繁体中文
            </Option>
            <Option value={ELanguageType.Chinese}>
                简体中文
            </Option>
            <Option value={ELanguageType.Japanese}>
                日本語
            </Option>
            {/* <Option value={ELanguageType.Spain}>Español</Option> */}
          </Select>
          <Select
            defaultValue={headData.currency}
            value={headData.currency}
            bordered={false}
            onChange={currencyChange}
            dropdownMatchSelectWidth={120}
            disabled={isDisableCurrencySelect}
            dropdownClassName="header-select-popup"
          >
            {Object.values(ECurrencyType).map(
              (currency: string, index: number) => {
                return (
                  <Option key={index} value={currency}>
                      {currency}
                  </Option>
                );
              }
            )}
          </Select>
          {/* <Select
            value={t("contact us")}
            dropdownMatchSelectWidth={false}
            bordered={false}
            dropdownClassName="header-select-popup"
          >
            {
              telList.map((item, index) => (
                <Option value="tel" key={index}>
                  <div  className="contact-us">
                    <img src={item.icon} />
                    <div className="contact-us-item">
                      <p>{t(item.country)}</p>
                      <p className="num">{item.tel}</p>
                    </div>
                  </div>
                </Option>
              )
              )
            }
            <Option value="email">
            <div  className="contact-us">
               <img src="/static/image/home/mail.jpg" />
               <div className="contact-us-item">
                  <p>{t('Email Us')}</p>
                  <a href="mailto:helpdesk@skywingtrip.com" target="_blank" rel="noreferrer">{t("helpdesk@skywingtrip.com")}</a>
                </div>
              </div>
            </Option>
          </Select> */}
          <Button className="btn-sign" type="primary">
            {userInfo.email ? (
              <div style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Popover
                  content={
                    <div>
                      <div style={{ alignItems: 'center', textAlign: 'center' }}>
                        <Button onClick={() => navigate("/detaillist")} type="text">{t('My Bookings')}</Button>
                      </div>
                      <div style={{ alignItems: 'center', textAlign: 'center' }}>
                        <Button onClick={() => onClickChage()} type="text">{t('Change password')}</Button>
                      </div>
                      <div style={{ alignItems: 'center', textAlign: 'center' }}>
                        <Button onClick={() => loginOut()} type="text">{t('Sign Out')}</Button>
                      </div>
                    </div>
                  }
                  placement="bottom"
                  trigger="hover"
                >
                  <div >{t("hello") + ', ' + userInfo.userName}</div>
                </Popover>
              </div>
            ) : (
              <div onClick={() => showModal()}>{t("Sign In/Register")}</div>
            )}
          </Button>
        </div>
      </div>
      <Modal
        title=""
        open={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
        closable={false}
      >
        {renderUserPage(userPageType)}
      </Modal>
      <SideBar></SideBar>
    </div>
  );
})
