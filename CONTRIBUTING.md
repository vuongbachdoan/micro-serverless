# Contributing to Serverless Microservices Framework

Thank you for considering contributing to the Serverless Microservices Framework! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

- Check if the bug has already been reported in the Issues section
- Use the bug report template to create a new issue
- Include detailed steps to reproduce the bug
- Include any relevant logs or error messages

### Suggesting Enhancements

- Check if the enhancement has already been suggested in the Issues section
- Use the feature request template to create a new issue
- Describe the enhancement in detail and explain why it would be valuable

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Make your changes
4. Run tests to ensure your changes don't break existing functionality
5. Submit a pull request

## Development Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/serverless-microservices.git
   cd serverless-microservices
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Bootstrap CDK (first-time only)
   ```bash
   cdk bootstrap
   ```

## Project Structure

- `bin/` - CDK app entry point and deployment scripts
- `lib/` - Core framework code
  - `config/` - Configuration parsing and validation
  - `constructs/` - CDK constructs for AWS resources
  - `stacks/` - CDK stacks for service deployment
- `src/` - Sample microservice implementations
- `config/` - Service configuration YAML files
- `templates/` - Template files for new services
- `docs/` - Documentation

## Coding Standards

- Follow the existing code style
- Write clear, descriptive commit messages
- Add comments for complex logic
- Write tests for new functionality

## Testing

Run tests with:

```bash
npm test
```

## Documentation

- Update documentation when adding or changing features
- Use clear, concise language
- Include examples where appropriate

## License

By contributing to this project, you agree that your contributions will be licensed under the project's [LICENSE](LICENSE).