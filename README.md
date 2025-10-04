# Angular UI Library Adapter POC

A proof-of-concept Angular application demonstrating a **dynamic UI library adapter** that allows seamless switching between different UI component libraries (Angular Material and PrimeNG) without changing application code.

## Purpose

This project showcases how to build a unified interface for different UI libraries, enabling:
- **Library-agnostic components** - Write once, use with any UI library
- **Runtime library switching** - Change UI libraries via configuration
- **Dynamic component binding** - Automatically map inputs/outputs to underlying components
- **Consistent API** - Same component interface regardless of underlying library

## Architecture

### Core Components

1. **AutocompleteConfigComponent** - Generic wrapper that dynamically loads UI library components
2. **UiLibraryService** - Service that provides components based on configured library
3. **Component Factories** - Maps component names to actual library implementations
4. **Dynamic Binding System** - Automatically binds inputs/outputs to target components

### Supported Libraries

- **Angular Material** - Modern Material Design components
- **PrimeNG** - Rich UI component suite

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Angular CLI (v20 or later)

### Installation

1. Clone the repository:
```
git clone <repository-url>
cd angular-ui-library-poc
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
ng serve
```

4. Open your browser to `http://localhost:4200`

## Configuration

### Switching UI Libraries

To switch between UI libraries, modify `src/app/app.config.ts`:

```typescript
// For PrimeNG
provideUiLibrary('primeng')

// For Angular Material
provideUiLibrary('angular-material')
```

### Component Usage

The same component works with both libraries with respective input/output bindings. Example with Angular Material


```html
<app-autocomplete-config
  [config]="{
    panelWidth: '200px',
    options: filteredOptions,
    control: autocompleteControl
  }"
  [events]="{
    optionSelected: onOptionSelected.bind(this)
  }">
</app-autocomplete-config>
```

## Project Structure

```
src/
├── app/
│   ├── app.config.ts          # UI library configuration
│   └── app.ts                 # Main application component
├── ui-library-adapter/
│   ├── components/
│   │   └── autocomplete/      # Generic autocomplete wrapper
│   ├── core/
│   │   ├── ui-library.service.ts     # Library selection service
│   │   ├── ui-library.token.ts       # Injection token
│   │   └── component-bindings.util.ts # Dynamic binding utility
│   └── ui-libraries/
│       ├── angular-material/  # Material Design components
│       └── primeng/          # PrimeNG components
└── provider.ts               # UI library provider function
```

## How It Works

### 1. Dynamic Component Loading

```typescript
const component = this.uiLibraryService.getComponent('autocomplete');
this.componentRef = this.container.createComponent(component);
```

### 2. Automatic Property Binding

```typescript
// Extract component metadata
const bindings = getComponentBindings(component);

// Apply inputs dynamically
for (const input of bindings.inputs) {
  if (this.config[input] !== undefined) {
    (this.componentRef.instance as any)[input] = this.config[input];
  }
}
```

### 3. Wrapper Component Support

For complex components needing templates (like Material autocomplete):

```typescript
// Component wrapper configuration
static readonly wrapperConfig = {
  targetProperty: 'auto',           // Property exposing wrapped component
  passthroughProps: ['options']     // Props for wrapper vs target
};
```

## Key Features

### Dynamic Property Binding
- Automatically maps configuration properties to component inputs
- Supports both direct component binding and wrapper component patterns
- Handles event binding for outputs

### FormControl Integration
- Pass FormControl from parent component
- Reactive form support with value change detection
- Seamless integration with Angular forms

### Extensible Design
- Easy to add new UI libraries
- Consistent component interface
- Minimal code changes for new components

## Example: Adding a New UI Library

1. Create factory file:
```typescript
// src/ui-library-adapter/ui-libraries/my-library/my-autocomplete.factory.ts
export const MY_LIBRARY_COMPONENTS: Record<string, Type<any>> = {
  'autocomplete': MyAutocompleteComponent,
};
```

2. Update service:
```typescript
// Add to UiLibraryService constructor
if (library === 'my-library') {
  this.registry = MY_LIBRARY_COMPONENTS;
}
```

3. Update token type:
```typescript
export type UiLibrary = 'primeng' | 'angular-material' | 'my-library';
```

## Current Implementation

The demo includes:
- **Autocomplete component** with search functionality
- **FormControl integration** for reactive forms
- **Dynamic filtering** based on user input
- **Event handling** for both libraries

### Search Functionality

```typescript
search(event: any) {
  this.filteredOptions = this.options.filter(item =>
    item.toLowerCase().includes(event.query.toLowerCase())
  );
}
```

## Contributing

This is a proof-of-concept project. Feel free to:
- Add support for more UI libraries
- Implement additional component types
- Improve the binding mechanism
- Add TypeScript type safety

## License

This project is for demonstration purposes.

---

**Built with Angular 20, PrimeNG, and Angular Material**
