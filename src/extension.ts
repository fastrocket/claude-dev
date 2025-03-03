// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode"
import { SidebarProvider } from "./providers/SidebarProvider"

/*
Built using https://github.com/microsoft/vscode-webview-ui-toolkit

Inspired by
https://github.com/microsoft/vscode-webview-ui-toolkit-samples/tree/main/default/weather-webview
https://github.com/microsoft/vscode-webview-ui-toolkit-samples/tree/main/frameworks/hello-world-react-cra

*/

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "claude-dev" is now active!')

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// const disposable = vscode.commands.registerCommand("claude-dev.helloWorld", () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage("Hello World from claude-dev!")
	// })
	// context.subscriptions.push(disposable)

	const provider = new SidebarProvider(context)

	context.subscriptions.push(vscode.window.registerWebviewViewProvider(SidebarProvider.viewType, provider))

	context.subscriptions.push(
		vscode.commands.registerCommand("claude-dev.plusButtonTapped", async () => {
			//const message = "claude-dev.plusButtonTapped!"
			//vscode.window.showInformationMessage(message)
			await provider.clearTask()
			await provider.postStateToWebview()
			await provider.postMessageToWebview({ type: "action", action: "plusButtonTapped"})
		})
	)

	context.subscriptions.push(
		vscode.commands.registerCommand("claude-dev.settingsButtonTapped", () => {
			//const message = "claude-dev.settingsButtonTapped!"
			//vscode.window.showInformationMessage(message)
			provider.postMessageToWebview({ type: "action", action: "settingsButtonTapped"})
		})
	)

}

// This method is called when your extension is deactivated
export function deactivate() {}
