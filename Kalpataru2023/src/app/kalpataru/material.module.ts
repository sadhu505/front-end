import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
// import {MatOptionModule} from '@angular/material/option';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    imports:[
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
        // MatOptionModule
    ],
    exports:[
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule
        // MatOptionModule
    ]
})
export class MaterialModule{
    
}