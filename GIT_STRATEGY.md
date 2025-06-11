# Git Strategy Document

## Team Roles and Responsibilities

### Dev Mobile
- Develop and maintain the React/Expo mobile application
- Implement UI components and user interactions
- Ensure responsive design and cross-platform compatibility
- Write unit tests for mobile components
- Handle mobile-specific state management
- Optimize mobile performance
- Review and approve mobile-related PRs
- Document mobile development guidelines
- Coordinate with backend team for API integration
- Maintain mobile development environment

### Dev IoT
- Develop and maintain system monitoring scripts
- Implement data collection for CPU, RAM, and network metrics
- Ensure accurate system data gathering
- Write tests for IoT components
- Handle real-time data processing
- Optimize data collection performance
- Review and approve IoT-related PRs
- Document IoT system architecture
- Coordinate with backend team for data transmission
- Maintain IoT development environment
- Monitor system resource usage
- Implement error handling and recovery

### Dev Backend
- Develop and maintain Express.js REST API
- Implement data processing and storage solutions
- Ensure API security and performance
- Write API documentation
- Handle database operations
- Implement authentication and authorization
- Review and approve backend-related PRs
- Document backend architecture
- Coordinate with mobile and IoT teams
- Maintain backend development environment
- Monitor API performance
- Implement error handling and logging

### Dev "cross"
- Coordinate between mobile, IoT, and backend teams
- Ensure consistent development practices
- Review cross-component integration
- Handle deployment and CI/CD pipelines
- Maintain project documentation
- Implement security best practices
- Review and approve cross-component PRs
- Document system architecture
- Coordinate testing across components
- Maintain development environments
- Monitor system integration
- Handle cross-component issues
- Ensure code quality standards
- Manage technical debt
- Coordinate releases

## Git Convention

### Branch Naming
```
<type>/<ticket-id>-<short-description>
```

Types:
- `feature/` - New features
- `fix/` - Bug fixes
- `hotfix/` - Urgent production fixes
- `release/` - Release preparation
- `docs/` - Documentation updates

Examples:
- `feature/AUTH-123-user-login`
- `fix/API-456-rate-limit`
- `hotfix/SEC-789-security-patch`

### Commit Tags
```
<type>(<scope>): <ticket-id> <description>
```

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance
- `add ` - adding new files or features

Examples:
```
feat(auth): AUTH-123 implement login
fix(api): API-456 fix rate limiting
docs(readme): DOC-789 update installation steps
```

### Basic Git Commands

#### Create and Switch to Branch
```bash
# Create and switch to new branch
git checkout -b feature/AUTH-123-user-login

# Switch to existing branch
git checkout feature/AUTH-123-user-login
```

#### Update Branch
```bash
# Get latest changes
git pull origin develop

# Update your branch
git rebase develop
```

#### Commit Changes
```bash
# Stage changes
git add .

# Commit with message
git commit -m "feat(auth): AUTH-123 implement login"

# Push changes
git push origin feature/AUTH-123-user-login
```

#### Merge Process
```bash
# Merge develop into your branch
git checkout feature/AUTH-123-user-login
git merge develop

# Push changes
git push origin feature/AUTH-123-user-login
```

### Best Practices
1. Always pull latest changes before starting new work
2. Keep commits atomic and focused
3. Write clear commit messages
4. Delete branches after merging
5. Never commit directly to main/develop
6. Always create PR for code review
7. Keep branches up to date with develop

## Feature Creation Process

### 1. Pre-Development
- Create issue/ticket in project management tool
- Define acceptance criteria
- Assign story points
- Get approval from lead developer

### 2. Branch Creation
```bash
# Update develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/ticket-id-short-description
```

### 3. Development Workflow
- Make atomic commits following convention
- Keep branch up to date with develop
- Write tests for new features
- Update documentation
- Self-review before PR

### 4. Pull Request Creation
- Reference issue/ticket number
- Include acceptance criteria checklist
- Add screenshots if UI changes
- Request reviews from team members
- Ensure CI/CD passes

## Merge and Rebase Rules

### Merge Rules
1. **Feature Branches**
   - Always merge into develop
   - Use squash merge for clean history
   - Delete branch after merge
   - Update ticket status

2. **Hotfix Branches**
   - Merge into both main and develop
   - Create release tag
   - Update version numbers
   - Document changes

3. **Release Branches**
   - Merge into main only
   - Create version tag
   - Update changelog
   - Deploy to production

### Rebase Rules
1. **When to Rebase**
   - Before creating PR
   - When develop has new changes
   - To clean up commit history
   - To resolve conflicts

2. **Rebase Process**
```bash
# Update develop
git checkout develop
git pull origin develop

# Rebase feature branch
git checkout feature/your-branch
git rebase develop

# Resolve conflicts if any
git add .
git rebase --continue

# Force push if necessary
git push origin feature/your-branch --force-with-lease
```

3. **Rebase Restrictions**
   - Never rebase shared branches
   - Don't rebase after PR review
   - Avoid rebasing main/develop
   - Use force-with-lease for safety

## Commit Format

### Structure
```
<type>(<scope>): <ticket-id> <subject>

<body>

<footer>
```

### Type Categories
1. **Feature Development**
   - `feat`: New feature
   - `enhance`: Feature improvement
   - `perf`: Performance optimization

2. **Bug Fixes**
   - `fix`: Bug fix
   - `patch`: Quick fix
   - `hotfix`: Critical fix

3. **Maintenance**
   - `docs`: Documentation
   - `style`: Code style
   - `refactor`: Code refactoring
   - `test`: Testing
   - `chore`: Maintenance

### Scope Examples
- `auth`: Authentication module
- `api`: API endpoints
- `ui`: User interface
- `db`: Database
- `test`: Testing framework

### Examples

#### Feature Development
```
feat(auth): AUTH-123 implement OAuth2 login

- Add Google OAuth2 integration
- Create login handler
- Update user model

Closes #123
```

#### Bug Fix
```
fix(api): API-456 resolve rate limiting issue

- Fix token bucket algorithm
- Add rate limit headers
- Update documentation

Fixes #456
```

#### Maintenance
```
chore(deps): DEP-789 update dependencies

- Update React to v18.2.0
- Update TypeScript to v5.0.0
- Fix breaking changes

Part of #789
```

## Quality Gates

### Pre-Merge Checks
- All tests passing
- Code coverage > 80%
- No linting errors
- Documentation updated
- Security scan passed

### Post-Merge Verification
- Deployment successful
- Integration tests passing
- Performance metrics within range
- No regression issues
- User acceptance testing passed 