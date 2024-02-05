import { HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Divider, Select, Typography } from "antd";
import { useTranslation } from "react-i18next";
import "./Footer.less";
const { Title } = Typography;

export function Footer() {
  const { t } = useTranslation();

  return (
    <div className="footer-wrapper">
      <div className="top-wrapper">
        <div className="contact-wrapper">
          <Title level={4}>{t("about")}</Title>
          <a href="/news/Company">{t("companyProfile")}</a>
          <a href="/news/Privacy">{t("Privacy Policy")}</a>
          <a href="/news/Terms">{t("Terms and Conditions")}</a>
        </div>
        <div className="contact-wrapper">
          <Title level={4}>{t("CONTACTS")}</Title>
          <p>
            <HomeOutlined />
            {t(
              "RM 05, 28/F HO KING COMM CTR2-16 FA YUEN ST MONGKOK KLN HONG KONG"
            )}
          </p>
          <a href="mailto:helpdesk@skywingtrip.com" target="_blank">
            <MailOutlined />
            {t("Email: helpdesk@skywingtrip.com")}
          </a>
        </div>
        <div className="contact-wrapper">
          <Title level={4}>{t("paymentMethod")}</Title>
          <div className="payment">
            <img
              className="paypal-logo"
              src="/static/image/home/nets.png"
            ></img>
            <img
              className="paypal-logo"
              src="/static/image/home/allpay.png"
            ></img>
            <img
              className="paypal-logo"
              src="/static/image/home/paypallogo.jpg"
            ></img>
            <img
              className="paypal-logo"
              src="/static/image/home/chinaUnionPay.jpg"
            ></img>
          </div>
          <Title level={4} className="partner-text">{t("Our Partners")}</Title>
          <div className="partner">
            <img
              className="kayak-logo"
              src="/static/image/home/kayak-logo.png"
            ></img>
            <img
              className="sc-logo"
              src="/static/image/home/skyscanner.jpg"
            ></img>
          </div>
        </div>
        <div className="contact-wrapper">
          <Title level={4}>{t("Security Certificate")}</Title>

          <img
            className="verify-logo"
            src="/static/image/home/digicert.png"
          ></img>
          <img
            className="verify-logo"
            src="/static/image/home/visa_verified.png"
          ></img>
        </div>
      </div>
      <p className="copyright">
        {t("copyright")}
        &nbsp;&nbsp;&nbsp;&nbsp;
      </p>
    </div>
  );
}
