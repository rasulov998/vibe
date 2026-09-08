import 'package:flutter_test/flutter_test.dart';
import 'package:veyro_generated_app/main.dart';

void main() {
  testWidgets('generated app boots', (tester) async {
    await tester.pumpWidget(const VeyroGeneratedApp());
    expect(find.text('Project generated successfully by VEYRO.'), findsOneWidget);
  });
}
