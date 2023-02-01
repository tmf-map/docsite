---
title: Introduction
---

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/web-security-cover.png' alt='web-security-cover'/>

Ensuring that your website or open web application is secure is critical. Even simple bugs in your code can result in private information being leaked, and bad people are out there trying to find ways to steal data. The web security-oriented articles listed here provide information that may help you secure your site and its code from attacks and data theft.

## Content security

### Content security policy (CSP)

Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement to the distribution of malware.

## Connection security

### Transport layer security (TLS)

The Transport Layer Security (TLS) protocol is the standard for enabling two networked applications or devices to exchange information privately and robustly. Applications that use TLS can choose their security parameters, which can have a substantial impact on the security and reliability of data. This article provides an overview of TLS and the kinds of decisions you need to make when securing your content.

### HTTPS

HTTPS (HyperText Transfer Protocol Secure) is an encrypted version of the HTTP protocol. It uses SSL or TLS to encrypt all communication between a client and a server. This secure connection allows clients to be sure that they are connected with the intended server, and to exchange sensitive data.

### HTTP Strict-Transport-Security

The `Strict-Transport-Security`: HTTP header lets a website specify that it may only be accessed using HTTPS.

### Certificate Transparency

Certificate Transparency is an open framework designed to protect against and monitor for certificate misissuances. Newly issued certificates are 'logged' to publicly run, often independent CT logs which maintain an append-only, cryptographically assured record of issued TLS certificates.

### Mixed content

An HTTPS page that includes content fetched using cleartext HTTP is called a mixed content page. Pages like this are only partially encrypted, leaving the unencrypted content accessible to sniffers and man-in-the-middle attackers.

### How to fix a website with blocked mixed content

If your website delivers HTTPS pages, all active mixed content delivered via HTTP on these pages will be blocked by default. Consequently, your website may appear broken to users (if iframes or plugins don't load, etc.). Passive mixed content is displayed by default, but users can set a preference to block this type of content, as well. This page explains what you should be aware of as a web developer.

### Secure contexts

A secure context is a Window or Worker for which there is reasonable confidence that the content has been delivered securely (via HTTPS/TLS), and for which the potential for communication with contexts that are not secure is limited. Many Web APIs and features are accessible only in a secure context. The primary goal of secure contexts is to prevent man-in-the-middle attackers from accessing powerful APIs that could further compromise the victim of an attack.

Features restricted to secure contexts This reference lists the web platform features available only in secure contexts.

### Weak signature algorithms

The strength of the hash algorithm used in signing a digital certificate is a critical element of the security of the certificate. This article provides some information about signature algorithms known to be weak, so you can avoid them when appropriate.

### Redirection with 301 and 302 response codes

to be written

## Data security

### Using HTTP Cookies

An HTTP cookie (web cookie, browser cookie) is a small piece of data that a server sends to the user's web browser. The browser may store it and send it back with later requests to the same server. Typically, it's used to tell if two requests came from the same browser — keeping a user logged-in, for example.

### Local storage

The Window object's Window.localStorage property is a way for servers to store data on a client that is persistent across sessions.

## Information leakage

### Referer header policy: privacy and security concerns

There are privacy and security risks associated with the Referer HTTP header. This article describes them and offers advice on mitigating those risks.

### IFrame credentialless

Iframe credentialless provides a mechanism for developers to load third-party resources in `<iframe>`s using a new, ephemeral context. This context doesn't have access to the network, cookies, and storage data associated with is origin. It uses a new context local to the top-level document lifetime. In return, the Cross-Origin-Embedder-Policy (COEP) embedding rules can be lifted, so documents with COEP set can embed third-party documents that do not.

## Integrity

### Same-origin policy

The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin. It helps isolate potentially malicious documents, reducing possible attack vectors.

### Subresource integrity

Subresource Integrity (SRI) is a security feature that enables browsers to verify that resources they fetch (for example, from a CDN) are delivered without unexpected manipulation. It works by allowing you to provide a cryptographic hash that a fetched resource must match.

### HTTP Access-Control-Allow-Origin

The `Access-Control-Allow-Origin` response header indicates whether the response can be shared with requesting code from the given origin.

### HTTP X-Content-Type-Options

The `X-Content-Type-Options` response HTTP header is a marker used by the server to indicate that the MIME types advertised in the Content-Type headers should not be changed and be followed. This is a way to opt out of MIME type sniffing, or, in other words, to say that the MIME types are deliberately configured.

## Clickjacking protection

In clickjacking, a user is fooled into clicking on a UI element that performs some action other than what the user expects.

### HTTP X-Frame-Options

The X-Frame-Options HTTP response header can be used to indicate whether a browser should be allowed to render a page in a `<frame>`, `<iframe>`, `<embed>` or `<object>`. Sites can use this to avoid clickjacking attacks, by ensuring that their content is not embedded into other sites.

### CSP: frame-ancestors

The HTTP Content-Security-Policy (CSP) frame-ancestors directive specifies valid parents that may embed a page using `<frame>`, `<iframe>`, `<object>`, `<embed>`, or `<applet>`.

## User information security

### Insecure passwords

Serving login forms over HTTP is especially dangerous because of the wide variety of attacks that can be used against them to extract a user's password. Network eavesdroppers could steal a user's password by sniffing the network, or by modifying the served page in transit.

### Privacy and the :visited selector

Before about 2010, the CSS :visited selector allowed websites to uncover a user's browsing history and figure out what sites the user had visited. To mitigate this problem, browsers have limited the amount of information that can be obtained from visited links.

## References

1. [MDN web docs: Web security](https://developer.mozilla.org/en-US/docs/Web/Security#connection_security)
