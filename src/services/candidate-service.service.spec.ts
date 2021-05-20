import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import{CandidateServiceService} from '../services/candidate-service.service';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../models/candidate';

describe('CandidateServiceService', () => {
  let service: CandidateServiceService;
let httpMock: HttpTestingController;
let httpClient: HttpClient;
let dataService : CandidateServiceService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [CandidateServiceService]


    });
    service = TestBed.inject(CandidateServiceService);
    httpMock=TestBed.get(HttpTestingController);
    httpClient=TestBed.get(HttpClient);
  });
afterEach(()=>{
httpMock.verify();
})

  it('Should test HttpClient.get',()=>{
    const testPost:Candidate[]=[
      {
        "id": 5,
        "name": "pallavi",
        "email": "pallavi@gmail.com",
        "city": "Nagpur",
        "state": "MH",
        "mobile": 7878558745,
        "age": 28,
        "dob": "2021-05-11T18:30:00.000Z",
        "postalCode": 440025
    },
    {
        "id": 6,
        "name": "rahul",
        "email": "rahul@gmail.com",
        "city": "Nagpur",
        "state": "MH",
        "mobile": 9696335698,
        "age": 13,
        "dob": "2021-05-17T18:30:00.000Z",
        "postalCode": 546545
    }
    ];
    service.findAll().subscribe((post)=>{
      expect(testPost).toBe(post);
    });
    const req=httpMock.expectOne(service.url+'/get');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(testPost);
  });


  it('Should test HttpClient.post',()=>{
      const newData:Candidate={
        "id":0,
      "name": "Sakshi",
      "email": "Sakshi@gmail.com",
      "city": "Pune",
      "state": "MH",
      "mobile": 7748978548,
      "age": 25,
      "dob": "2021-03-27T02:45:00.000Z",
      "postalCode": 440017};

      service.save(newData).subscribe(post=>{
        expect(post).toBe(newData);
      })
      const req=httpMock.expectOne(service.url+'/add');
      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');
      req.flush(newData);

  });

  it('Should test HttpClient.put',()=>{
    const newData:Candidate={
      "id":6,
    "name": "Sakshi",
    "email": "Sakshi@gmail.com",
    "city": "Delhi",
    "state": "UP",
    "mobile": 7748978548,
    "age": 25,
    "dob": "2021-03-27T02:45:00.000Z",
    "postalCode": 440017};
    service.update(newData).subscribe(post=>{
      expect(post).toBe(newData);
    })
    const req=httpMock.expectOne(service.url+'/update/'+6);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(newData);
});

it('Should test HttpClient.delete',()=>{
  let id=6;
  service.deleteById(id).subscribe(data=>{
      // expect(service.deleteById).toHaveBeenCalled();
  })
  const req=httpMock.expectOne(service.url+'/delete/'+id);
  expect(req.cancelled).toBeFalsy();
  expect(req.request.method).toBe('DELETE');
  req.flush([]);
});


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
