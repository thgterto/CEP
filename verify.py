from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))
    page.on("pageerror", lambda exc: print(f"PAGE ERROR: {exc}"))

    page.goto("http://localhost:8080")

    # Load demo data
    page.click("text=Dados Demo")

    # Click calculate
    page.click("text=Calcular CEP")

    # Wait for charts
    page.wait_for_selector("#chart-0")

    # Take screenshot
    page.screenshot(path="verification.png", full_page=True)

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
