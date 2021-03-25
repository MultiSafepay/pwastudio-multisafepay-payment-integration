<p align="center">
  <img src="https://www.multisafepay.com/img/multisafepaylogo.svg" width="400px" position="center">
</p>

<p align="center">
  <img src="https://docs.multisafepay.com/logo/Plugins/Magento_PWA.svg" width="400px" height="120px" position="center">
</p>

# MultiSafepay payments support extension for PWA Studio (Venia)
MultiSafepay Payments extension for PWA Studio with Magento 2 plugin as backend system. Plugin is fully Venia-compatible.

## About MultiSafepay ##
MultiSafepay is a collecting payment service provider which means we take care of the agreements, technical details and payment collection required for each payment method. You can start selling online today and manage all your transactions from one place.

## Supported Payment Methods ##
The supported Payment Methods & Giftcards for this plugin can be found over here: [Payment Methods & Giftcards](https://docs.multisafepay.com/integrations/ecommerce-integrations/magento2/faq/available-payment-methods-magento2/)   

**Note:** this extension supports all Payment Methods & Giftcards mentioned above, except: Request To Pay, Direct Debit, E-invoicing, Pay After Delivery. You can easily implement this payment methods as well using the Ideal, Afterpay or in3 components in this plugin.

## Requirements
- To use the plugin you need a MultiSafepay account. You can create a test account on https://testmerchant.multisafepay.com/signup
- Installed <a href="https://github.com/MultiSafepay/magento2-graphql" target="_blank">MultiSafepay Magento 2 GraphQL</a> plugin for support GraphQL queries.
- Meet other requirements for PWA Studio (Venia) and Magento on <a href="https://magento.github.io/pwa-studio/venia-pwa-concept/setup/#prerequisites" target="_blank">official Magento PWA Docs</a>

## Installation Guide

1. First, the MultiSafepay plugin for supporting GraphQL queries needs to be installed. The installation guide can be found <a href="https://github.com/MultiSafepay/magento2-graphql" target="_blank">here</a>.    
   
   **Note:** By installing the MultiSafepay GraphQL plugin, the MultiSafepay Core, Frontend and Adminhtml plugins will also be installed.
2. Configure the MultiSafepay payment methods and API keys in the Magento admin panel.
3. Configure cancel and success return redirect URL's
```text
Stores → Configuration → MultiSafepay → General Settings → Advanced Settings → Use custom return urls for PWA storefront integration
```
- For the 'custom redirect URL after canceling the payment' we suggest using the next link: *<your_pwa_url>/cart?maskedId={{quote.masked_id}}&multisafepayRestore=true*
- For the 'Custom "Success page" url' we suggest using the next link: *<your_pwa_url>/multisafepay/checkout/success/{{order.increment_id}}/maskedId/{{quote.masked_id}}*
4. Install Venia storefront using this <a href="https://magento.github.io/pwa-studio/venia-pwa-concept/setup/" target="_blank">installation guide</a>.
   4.1. Go to the extension folder:
   ```bash 
   cd your_project/packages/extensions
   ```
   4.2. Create MultiSafepay extension folder:
   ```bash 
   mkdir multisafepay-payment-integration
   ```
   4.3. Clone all extension files from this repository in *multisafepay-payment-integration* folder
   4.4. Link extension in venia-concept package.json. Go to the venia-concept folder and open *package.json*:
   ```bash 
   cd your_project/packages/venia-concept
   ```
   4.5. Add next dependency:
   ```bash 
   "dependencies": {
        "@multisafepay/multisafepay-payment-integration": "link:../extensions/multisafepay-payment-integration"
    },
   ```
   4.6. Go back to the project root folder and execute next commands:
   ```bash 
   yarn install && yarn watch:venia
   ```
5. Explore the checkout in your Venia application:
 <img width="1000" alt="Screenshot 2021-03-25 at 12 56 46" src="https://user-images.githubusercontent.com/78361324/112469889-4a728100-8d6a-11eb-98dd-7429f1154952.png">


## Support
You can create issues on our repository. If you need any additional help or support, please contact <a href="mailto:integration@multisafepay.com">integration@multisafepay.com</a>

We are also available on our Magento Slack channel [#multisafepay-payments](https://magentocommeng.slack.com/messages/multisafepay-payments/).
Feel free to start a conversation or provide suggestions as to how we can refine our plugin.

## A gift for your contribution
We look forward to receiving your input. Have you seen an opportunity to change things for better? We would like to invite you to create a pull request on GitHub.
Are you missing something and would like us to fix it? Suggest an improvement by sending us an [email](mailto:integration@multisafepay.com) or by creating an issue.

What will you get in return? A brand new designed MultiSafepay t-shirt which will make you part of the team!

## License
[Open Software License (OSL 3.0)](https://github.com/MultiSafepay/Magento2Msp/blob/master/LICENSE.md)

## Want to be part of the team?
Are you a developer interested in working at MultiSafepay? [View](https://www.multisafepay.com/careers/#jobopenings) our job openings and feel free to get in touch with us.
