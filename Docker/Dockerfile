FROM centos:7

ENV HOME /root

ENV XMPP_NAME Otalk
ENV XMPP_DOMAIN example.com
ENV XMPP_WSS wss://example.com:5281/xmpp-websocket/
ENV XMPP_MUC chat.example.com
ENV XMPP_STARTUP groupchat/room%40chat.example.com
ENV XMPP_ADMIN admin

ENV LDAP_BASE dc=example.com
ENV LDAP_DN cn=admin,dc=example.com
ENV LDAP_PWD password
ENV LDAP_GROUP mygroup

RUN yum update -y
RUN yum install -y vim wget sudo net-tools unzip pwgen openssh-server \
    epel-release make libicu-devel openldap-devel libuuid-devel
RUN yum install -y nodejs npm git

RUN git clone git://github.com/digicoop/kaiwa.git

RUN cd kaiwa && npm install

ADD app /app

RUN chmod +x /app/start.sh
CMD "/app/start.sh"
