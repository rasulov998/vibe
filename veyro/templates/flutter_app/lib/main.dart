import 'package:flutter/material.dart';

void main() => runApp(const VeyroGeneratedApp());

class VeyroGeneratedApp extends StatelessWidget {
  const VeyroGeneratedApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'VEYRO Generated App',
      theme: ThemeData(useMaterial3: true, colorSchemeSeed: Colors.deepPurple),
      home: const GeneratedHomePage(),
    );
  }
}

class GeneratedHomePage extends StatelessWidget {
  const GeneratedHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('VEYRO App')),
      body: const Center(
        child: Text('Project generated successfully by VEYRO.'),
      ),
    );
  }
}
