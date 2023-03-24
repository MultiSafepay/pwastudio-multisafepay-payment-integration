# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2023-03-27
### Added
- Add information about PWA Studio to the order request data 
- Hide Apple Pay when is not supported by the device
- Add Google Pay as redirect payment method

### Fixed
- Fix an issue where the shopping cart is empty after cancel a transaction

### Changed
- Now PWA Studio version 9.x.x, 10.x.x, 11.x.x are supported via a different branch than master, due the impossibility to keep retrocompatibility in master branch. Please refer to the [installation guide](https://github.com/MultiSafepay/pwastudio-multisafepay-payment-integration-internal#installation-guide) for more details.


## [1.0.4] - 2022-01-25
### Fixed
- Fixed compatibility issue with PWA Studio 12.1 (thanks to @Watch3ruk)

## [1.0.3] - 2022-01-14
### Added
- Added compatibility with @magento/venia-ui:9.1 (thanks to @yaroslav-qlicks)

### Fixed
- Fixed issue where cannot destructure property 'image' fix-undefined-method-dataonalData' as it is undefined (thanks to @yaroslav-qlicks)
- Fixed css include on PWA studio v12.1 (thanks to @yaroslav-qlicks)
- Fixed undefined command: "install-peers" (thanks to @yaroslav-qlicks)
- Fixed issue whether i18n directory doesn't exist with enabled i18n flag (thanks to @yaroslav-qlicks)

## [1.0.2] - 2021-11-26
### Added
- Added possibility to localize plugin texts

## [1.0.1] - 2021-08-11
### Added
- Added compatibility with PWA Studio 11.0.0


## [1.0.0] - 2021-02-16
### Added
- First public release
