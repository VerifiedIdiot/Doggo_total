package com.Doggo.DoggoEx.controller;

import com.Doggo.DoggoEx.dto.SaleDto;
import com.Doggo.DoggoEx.service.AdminSaleService;
import com.Doggo.DoggoEx.service.SaleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/admin/sales")
@RequiredArgsConstructor
public class AdminSaleController {
    private final AdminSaleService adminSaleService;

    // 판매 내역 전체 조회 → saleController에 있음

    // 송장 번호 입력
    @PutMapping({"/order/{id}"})
    public ResponseEntity<Boolean> invoiceInput(@PathVariable Long id, @RequestBody SaleDto saleDto) {
        boolean isTrue = adminSaleService.invoiceNum(id, saleDto.getOrderStatus(), saleDto.getInvoice());
        return ResponseEntity.ok(isTrue);
    }

    // 페이지네이션
    @GetMapping("/list/page")
    public ResponseEntity<List<SaleDto>> saleList(@RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "10") int size,
                                                  @RequestParam String filter) {
        List<SaleDto> list = adminSaleService.getSaleList(page, size, filter);
        log.info("list : {}", list);
        return ResponseEntity.ok(list);
    }

    // 페이지 수 조회
    @GetMapping("/list/count")
    public ResponseEntity<Integer> saleCount(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size,
                                             @RequestParam String filter) {
        PageRequest pageRequest = PageRequest.of(page, size);
        int pageCnt = adminSaleService.getSalePage(pageRequest, filter);
        return ResponseEntity.ok(pageCnt);
    }


}
