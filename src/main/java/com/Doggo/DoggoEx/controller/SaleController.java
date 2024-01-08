package com.Doggo.DoggoEx.controller;


import com.Doggo.DoggoEx.dto.MemberReqDto;
import com.Doggo.DoggoEx.dto.MemberResDto;
import com.Doggo.DoggoEx.dto.SaleDto;
import com.Doggo.DoggoEx.jwt.TokenProvider;
import com.Doggo.DoggoEx.security.SecurityUtil;
import com.Doggo.DoggoEx.service.AuthService;
import com.Doggo.DoggoEx.service.MemberService;
import com.Doggo.DoggoEx.service.SaleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/sale")
//@CrossOrigin(origins = CORS_ORIGIN)
@RequiredArgsConstructor
public class SaleController {
    private final SaleService saleService;
    private final TokenProvider tokenProvider;
    private final SecurityUtil securityUtil;
    private final MemberService memberService;
    // 구매 등록
    @PostMapping("/new")
    public ResponseEntity<Long> saleReg(@RequestBody SaleDto saleDto) {
        return ResponseEntity.ok(saleService.saveSale(saleDto));
    }
    // 구매내역 삭제
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> saleDelete(@PathVariable Long id) {
        boolean isTrue = saleService.deleteSale(id);
        return ResponseEntity.ok(isTrue);
    }
    // 구매내역 조회 (성공페이지)
    @PutMapping("/detail/{id}")
    public ResponseEntity<SaleDto> saleModify(@PathVariable Long id) {
        SaleDto saledto = saleService.detailSale(id);
        return ResponseEntity.ok(saledto);
    }

    // 배송 수정
    @PutMapping("/modify/{id}")
    public ResponseEntity<Boolean> saleModify(@PathVariable Long id, @RequestBody SaleDto saleDto) {
        boolean isTrue = saleService.saleDeliveryChange(id, saleDto);
        return ResponseEntity.ok(isTrue);
    }

    // 회원 이메일로 상품 리스트 조회
    @GetMapping("/list/email")
    public ResponseEntity<List<SaleDto>> salesListByEmail(@RequestParam String email) {
        List<SaleDto> list = saleService.getSalesListByEmail(email);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/list/all")
    public ResponseEntity<List<SaleDto>> salesListByAll() {
        List<SaleDto> list = saleService.getSalesListAll();
        return ResponseEntity.ok(list);
    }

    //로그인 여부 확인
    @GetMapping("/isLogin/{token}")
    public ResponseEntity<Boolean> isLogin(@PathVariable String token) {
        log.warn("token: {}", token);
        boolean isTrue = tokenProvider.validateToken(token);
        return ResponseEntity.ok(isTrue);
    }

    //토큰값받고 이메일 출력
    @GetMapping("/takenEmail")
    public ResponseEntity<String> takenEmail() {
        String email=memberService.getEmail(securityUtil.getCurrentMemberId());
        return ResponseEntity.ok(email);
    }

}
