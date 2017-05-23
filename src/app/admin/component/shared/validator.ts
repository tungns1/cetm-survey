import { Validators } from '@angular/forms';

const pattern_code: any ="^[a-zA-Z][a-zA-Z0-9-_]{5,19}$";
const CodeValidator = Validators.compose([Validators.required, Validators.pattern(this.pattern_code)]);

export const CommonValidator = {
    Code: CodeValidator
}