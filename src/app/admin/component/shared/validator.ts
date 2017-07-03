import { Validators } from '@angular/forms';

const pattern_code: any ="^(\\s)*?([a-zA-Z0-9_.]{4,120})(\\s)*?$";
const pattern_name: any ="^(.{4,})$";
const NameValidator = Validators.compose([Validators.required, Validators.pattern(pattern_name)]);
const CodeValidator = Validators.compose([Validators.required, Validators.pattern(pattern_code)]);

export const CommonValidator = {
    Code: CodeValidator,
    Name: NameValidator
}
