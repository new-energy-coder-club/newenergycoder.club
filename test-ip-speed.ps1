# Energy Coder Club Website - IP Speed Test Script
# Based on cs2dns project IP list for speed testing

Write-Host "=== Energy Coder Club Website IP Speed Test ===" -ForegroundColor Green
Write-Host

# Initialize results array
$results = @()

# Read top 10 optimal IPs from result.csv
$csvFile = "result.csv"
if (Test-Path $csvFile) {
    $ips = Import-Csv $csvFile | Select-Object -First 10
    Write-Host "Read $($ips.Count) IP addresses from $csvFile" -ForegroundColor Yellow
} else {
    Write-Host "$csvFile not found, using default IP list" -ForegroundColor Yellow
    # Default IP list (based on previous test results)
    $ips = @(
        @{"IP"="104.20.31.232"; "Region"="HKG"; "Latency"="61.50"; "Speed"="3.98"},
        @{"IP"="172.67.69.252"; "Region"="HKG"; "Latency"="61.48"; "Speed"="1.49"},
        @{"IP"="104.20.18.23"; "Region"="HKG"; "Latency"="66.83"; "Speed"="1.39"},
        @{"IP"="172.67.75.34"; "Region"="HKG"; "Latency"="61.99"; "Speed"="0.56"},
        @{"IP"="104.18.79.56"; "Region"="SJC"; "Latency"="168.83"; "Speed"="0.29"}
    )
}

Write-Host
Write-Host "Starting IP speed tests..." -ForegroundColor Yellow
Write-Host

foreach ($ip in $ips) {
    # Handle both CSV and default array formats
    if ($ip."IP Address") {
        $ipAddress = $ip."IP Address"
        $region = if ($ip."Region Code") { $ip."Region Code" } else { "Unknown" }
    } elseif ($ip."IP") {
        $ipAddress = $ip."IP"
        $region = $ip."Region"
    } else {
        $ipAddress = $ip."IP 地址"
        $region = $ip."地区码"
    }
    
    Write-Host "Testing IP: $ipAddress ($region)" -ForegroundColor Cyan
    
    # Test connectivity and latency
    try {
        $testResult = Test-NetConnection -ComputerName $ipAddress -Port 443 -WarningAction SilentlyContinue
        
        if ($testResult.TcpTestSucceeded) {
            # Test HTTP response time
            $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
            try {
                $response = Invoke-WebRequest -Uri "https://$ipAddress" -TimeoutSec 10 -UseBasicParsing -Headers @{"Host"="energy-coder-club-website.pages.dev"} -ErrorAction Stop
                $stopwatch.Stop()
                $responseTime = $stopwatch.ElapsedMilliseconds
                $status = "Success"
                $httpStatus = $response.StatusCode
            } catch {
                $stopwatch.Stop()
                $responseTime = $stopwatch.ElapsedMilliseconds
                $status = "HTTP Error"
                $httpStatus = "N/A"
            }
        } else {
            $responseTime = "N/A"
            $status = "Connection Failed"
            $httpStatus = "N/A"
        }
    } catch {
        $responseTime = "N/A"
        $status = "Test Failed"
        $httpStatus = "N/A"
    }
    
    $result = [PSCustomObject]@{
        "IP_Address" = $ipAddress
        "Region" = $region
        "Connection_Status" = $status
        "HTTP_Status" = $httpStatus
        "Response_Time_ms" = $responseTime
    }
    
    $results += $result
    
    Write-Host "  Connection Status: $status" -ForegroundColor $(if($status -eq "Success") {"Green"} else {"Red"})
    Write-Host "  HTTP Status: $httpStatus"
    Write-Host "  Response Time: $responseTime ms"
    Write-Host
}

# Display test results
Write-Host "=== Test Results Summary ===" -ForegroundColor Green
$results | Format-Table -AutoSize

# Save results to CSV
$outputFile = "ip_speed_test_$(Get-Date -Format 'yyyyMMdd_HHmmss').csv"
$results | Export-Csv -Path $outputFile -NoTypeInformation -Encoding UTF8
Write-Host "Test results saved to: $outputFile" -ForegroundColor Yellow

# Recommend optimal IP
$successfulResults = $results | Where-Object { $_."Connection_Status" -eq "Success" -and $_."Response_Time_ms" -ne "N/A" }
if ($successfulResults.Count -gt 0) {
    $bestIP = $successfulResults | Sort-Object { [int]$_."Response_Time_ms" } | Select-Object -First 1
    Write-Host
    Write-Host "=== Recommended Configuration ===" -ForegroundColor Green
    Write-Host "Best IP: $($bestIP."IP_Address") (Region: $($bestIP."Region"), Response Time: $($bestIP."Response_Time_ms")ms)" -ForegroundColor Cyan
    Write-Host
    Write-Host "Suggested hosts file configuration:"
    Write-Host "$($bestIP."IP_Address") energy-coder-club-website.pages.dev" -ForegroundColor Yellow
    Write-Host "$($bestIP."IP_Address") 7d2196df.energy-coder-club-website.pages.dev" -ForegroundColor Yellow
} else {
    Write-Host "No available IP addresses found" -ForegroundColor Red
}

Write-Host
Write-Host "Test completed!" -ForegroundColor Green