<p align="center">
  <img src="https://www.multisafepay.com/img/multisafepaylogo.svg" width="400px" position="center">
</p>

# MultiSafepay payments support extension for PWA Studio (Venia)
MultiSafepay Payments extension for PWA Studio with Magento 2 plugin as backend system. Plugin is fully Venia-compatible.

## About MultiSafepay ##
MultiSafepay is a collecting payment service provider which means we take care of the agreements, technical details and payment collection required for each payment method. You can start selling online today and manage all your transactions from one place.

## Supported payment methods ##
The supported Payment Methods & Giftcards for this plugin can be found over here: [Payment Methods & Giftcards](https://docs.multisafepay.com/integrations/ecommerce-integrations/magento2/faq/available-payment-methods-magento2/)   

**Note:** this extension supports all Payment Methods & Giftcards mentioned above, except: Alipay+ ™ Partner, Amazon Pay, Direct Debit, E-invoicing, MyBank, Pay After Delivery, Pay After Delivery Installments, Request To Pay, WeChat Pay. Please send us an email if you want to use any of the above payment methods and we will add them.

## Prerequisites
- To use the plugin you need a MultiSafepay account. You can create a test account on https://testmerchant.multisafepay.com/signup
- <a href="https://github.com/MultiSafepay/magento2-graphql" target="_blank">MultiSafepay Magento 2 GraphQL</a> plugin for support GraphQL queries.
- Meet other requirements for PWA Studio (Venia) and Magento on <a href="https://magento.github.io/pwa-studio/venia-pwa-concept/setup/#prerequisites" target="_blank">official Magento PWA Docs</a>

## Installation Guide

1. First, the MultiSafepay plugin for supporting GraphQL queries needs to be installed. The installation guide can be found <a href="https://github.com/MultiSafepay/magento2-graphql" target="_blank">here</a>.    
   
   **Note:** By installing the MultiSafepay GraphQL plugin, the MultiSafepay Core, Frontend and Adminhtml plugins will also be installed.

2. Configure the MultiSafepay payment methods and API keys in the Magento admin panel.

3. In the Magento admin panel configure cancel and success return redirect URL's in Stores → Configuration → MultiSafepay → General Settings → Advanced Settings → Use custom return urls

  - For the 'custom redirect URL after canceling the payment' we suggest using the next link: *<your_pwa_url>/cart?maskedId={{quote.masked_id}}&multisafepayRestore=true*

  - For the 'Custom "Success page" url' we suggest using the next link: *<your_pwa_url>/multisafepay/checkout/success/{{order.increment_id}}/maskedId/{{quote.masked_id}}*

4. Setup a PWA Studio storefront following the steps in this  <a href="https://developer.adobe.com/commerce/pwa-studio/tutorials/setup-storefront/" target="_blank">installation guide</a>.

   4.1. Go to the extension folder (or create the directory if this one doesn't exist):
   ``` 
   cd your_project/packages/extensions
   ```

   4.2. Create MultiSafepay extension folder:
   ``` 
   mkdir multisafepay-payment-integration
   ```

   4.3. Clone all extension files from this repository in *multisafepay-payment-integration* folder

   ``` 
   git clone https://github.com/MultiSafepay/pwastudio-multisafepay-payment-integration.git ./multisafepay-payment-integration
   ```

   4.4. If your application is based in a PWA Studio version lower than 12.X, switch to the proper branch. There are 3 branches in which retrocompatibility is supported:
   ``` 
   git checkout compatibility-v9
   git checkout compatibility-v10
   git checkout compatibility-v11
   ```

   4.5. Link extension in venia-concept package.json.   
   Go to the venia-concept folder and open *package.json:*
   ``` 
   cd your_project/
   ```
   
   4.6. Add next dependency:
   ``` 
   "dependencies": {
        "@multisafepay/multisafepay-payment-integration": "link:./packages/extensions/multisafepay-payment-integration"
    },
   ```
   
   4.7. Go back to the project root folder and execute next commands:
   ``` 
   yarn install && yarn watch:venia
   ```

5. Explore the checkout in your Venia application:
 <img width="1000" alt="Screenshot 2021-03-25 at 12 56 46" src="https://user-images.githubusercontent.com/78361324/112469889-4a728100-8d6a-11eb-98dd-7429f1154952.png">


## Support

- Create an issue on this repository.
- Email <a href="mailto:integration@multisafepay.com">integration@multisafepay.com</a>

## Contributors

If you see an opportunity to make an improvement, we invite you to create a pull request, create an issue, or email <integration@multisafepay.com>

As a thank you for your contribution, we'll send you a MultiSafepay t-shirt, making you part of the team!

## Want to be part of the team?

Are you a developer interested in working at MultiSafepay? Check out our [job openings](https://www.multisafepay.com/careers/#jobopenings) and feel free to get in touch!