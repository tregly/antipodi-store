import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AntipodiStoreTestModule } from '../../../test.module';
import { UtenteUpdateComponent } from 'app/entities/utente/utente-update.component';
import { UtenteService } from 'app/entities/utente/utente.service';
import { Utente } from 'app/shared/model/utente.model';

describe('Component Tests', () => {
  describe('Utente Management Update Component', () => {
    let comp: UtenteUpdateComponent;
    let fixture: ComponentFixture<UtenteUpdateComponent>;
    let service: UtenteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AntipodiStoreTestModule],
        declarations: [UtenteUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UtenteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UtenteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UtenteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Utente(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Utente();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
