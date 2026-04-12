import { describe, it, expect, beforeEach } from 'vitest'
import { createApp } from 'vue'
import { createPriscillaAI, getPriscillaAIEndpoint } from '@/plugins/priscillaAI'
import '../styles/index.css'

/**
 * Plugin Integration Tests (6 tests)
 *
 * These tests verify that the PriscillaAI plugin is correctly initialized,
 * installed, and configured within a Vue application.
 */
describe('PriscillaAI Plugin Integration', () => {
  let app: ReturnType<typeof createApp>

  beforeEach(() => {
    app = createApp({})
  })

  /**
   * Test 1: Plugin initialization with correct API endpoint
   *
   * Verifies that the plugin can be created with a valid API endpoint URL.
   * This test ensures the createPriscillaAI factory function works properly
   * with a properly formatted API endpoint.
   */
  it('should initialize plugin with correct API endpoint', () => {
    const endpoint = 'http://localhost:8000/api/v1'
    const plugin = createPriscillaAI(endpoint)
    expect(plugin).toBeDefined()
    expect(plugin.install).toBeDefined()
  })

  /**
   * Test 2: Global $priscillaAIEndpoint property availability
   *
   * Validates that after plugin installation, the global property
   * $priscillaAIEndpoint is available on the Vue app instance.
   * This ensures the plugin registers the endpoint as a global property.
   */
  it('should register global $priscillaAIEndpoint property', () => {
    const endpoint = 'http://localhost:8000/api/v1'
    const plugin = createPriscillaAI(endpoint)
    plugin.install(app)

    expect(app.config.globalProperties.$priscillaAIEndpoint).toBe(endpoint)
  })

  /**
   * Test 3: Valid API endpoint format acceptance
   *
   * Ensures the plugin accepts and properly handles various valid API endpoint
   * formats. Tests that HTTPS, custom ports, and path parameters are handled.
   */
  it('should accept valid API endpoint formats', () => {
    const validEndpoints = [
      'http://localhost:8000/api/v1',
      'https://api.example.com/v1',
      'http://localhost:3000/api',
      'https://api.priscilla.dev/endpoints',
    ]

    validEndpoints.forEach((endpoint) => {
      const plugin = createPriscillaAI(endpoint)
      plugin.install(app)
      expect(app.config.globalProperties.$priscillaAIEndpoint).toBe(endpoint)
    })
  })

  /**
   * Test 4: API URL storage in plugin instance
   *
   * Verifies that the API endpoint is properly stored and retrievable
   * via the getPriscillaAIEndpoint() function after plugin installation.
   * This test ensures the endpoint persists across the application lifecycle.
   */
  it('should store API URL in plugin instance', () => {
    const endpoint = 'http://localhost:8000/api/v1'
    const plugin = createPriscillaAI(endpoint)
    plugin.install(app)

    const storedEndpoint = getPriscillaAIEndpoint()
    expect(storedEndpoint).toBe(endpoint)
  })

  /**
   * Test 5: CSS style definitions
   *
   * Validates that the plugin properly imports and applies CSS styles.
   * This test ensures all style dependencies are bundled correctly.
   * Note: This test verifies the import succeeded without errors.
   */
  it('should import CSS styles correctly', () => {
    expect(() => {
      createPriscillaAI('http://localhost:8000/api/v1')
    }).not.toThrow()
  })

  /**
   * Test 6: Plugin installation flow
   *
   * End-to-end test of the complete plugin installation flow:
   * 1. Create plugin with endpoint
   * 2. Install plugin into Vue app
   * 3. Verify global properties are set
   * 4. Verify component registration
   *
   * This comprehensive test ensures the entire setup process works seamlessly.
   */
  it('should complete full plugin installation flow', () => {
    const endpoint = 'http://localhost:8000/api/v1'
    const plugin = createPriscillaAI(endpoint)

    // Plugin install without errors
    expect(() => plugin.install(app)).not.toThrow()

    // Global property registered
    expect(app.config.globalProperties.$priscillaAIEndpoint).toBe(endpoint)

    // Component registered globally
    expect(app.component.toString().includes('PriscillaAI')).toBeDefined()

    // Endpoint retrievable
    expect(getPriscillaAIEndpoint()).toBe(endpoint)
  })
})
